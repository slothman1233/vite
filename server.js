const fs = require('fs');
const path = require('path');
const express = require('express');

// 替换 node Promise，优化项，非必需
// global.Promise = require('bluebird')

const resolve = (p) => path.resolve(__dirname, p);
/**
 * 是否使用对象池
 * @type {boolean}
 */
const usePool = true;

// 环境
const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev:seo';
const isSeo = process.env.NODE_ENV === 'production:seo' || process.env.NODE_ENV === 'dev:seo';

/**
 * 复制 dist 文件至 run 文件夹下
 * @returns {void}
 */
function cp2run() {
  function copy(from, to) {
    const files = fs.readdirSync(from);
    for (let i in files) {
      if (files.hasOwnProperty(i)) {
        let _src = path.join(from, files[i]);
        let _run = path.join(to, files[i]);

        let _srcStat = fs.statSync(_src);
        if (_srcStat.isDirectory()) {
          if (!fs.existsSync(_run)) {
            fs.mkdirSync(_run);
          }
          copy(_src, _run);
        } else if (_srcStat.isFile()) {
          fs.copyFileSync(_src, _run);
        }
      }
    }
  }
  if (!fs.existsSync(resolve('run'))) {
    fs.mkdirSync(resolve('run'));
  }
  copy(resolve('dist'), resolve('run'));
}

/**
 * 判断是否是爬虫
 * @param req
 * @returns {boolean}
 */
function isSpider(req) {
  // 根据 UA 判断
  // 如果需要防止伪造 UA，还可以继续使用 host 反查
  const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLocaleLowerCase() : '';
  return ua.indexOf('spider') >= 0 || ua.indexOf('bot') >= 0;
}

async function createServer() {
  const app = express();

  // 生产环境下可使用 nginx 处理静态资源，非必需
  app.use(
    require('serve-static')(resolve('run/client'), {
      index: false,
    }),
  );

  let vite, seoRender, spaTemplate, seoTemplate, manifest;
  if (isDev) {
    vite = await require('vite').createServer({
      root: process.cwd(),
      mode: 'dev',
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    });
    app.use(vite.middlewares);
    manifest = {};
  } else {
    /**
     * 复制文件，原因有二：
     * 1、过渡，打包后如果删除旧文件，客户端未刷新浏览器，可能会访问出错
     * 2、防止爬虫快照访问静态资源失败
     */
    await cp2run();

    spaTemplate = fs.readFileSync(resolve('run/client/index.html'), 'utf-8');
    // SEO模版，去掉JS文件引用，爬虫不需要运行 JS，且会有 Hydration 警告，因为服务端与客户端数据不一样，非必要
    seoTemplate = spaTemplate;
    // .replace(/<script\b[^>]*>[\s\S]*<\/script>/, '')
    // .replace(/<link rel="modulepreload" \b[^>]*>/, '');

    manifest = require('./run/client/ssr-manifest.json');
    seoRender = require(resolve('run/server/entry-server.js'));
  }

  const maxLen = 10;
  const AppList = [];
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      // TODO 模拟接口测试
      if (url === '/list.json') {
        res
          .status(200)
          .set({ 'Content-Type': 'text/html' })
          .end(
            JSON.stringify({
              list: ['a', 'b', 'c'],
            }),
          );
        return;
      }

      let template, entryServer;
      if (isDev) {
        // 开发环境

        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        console.log(url);
        template = await vite.transformIndexHtml(url, template);
        if (isSeo) {
          // SEO 同样去掉 JS 代码，否则有 Hydration 警告
          template = template.replace(
            `<script type="module" src="/client/entry-client.ts"></script>`,
            '',
          );
        } else {
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
          return;
        }

        entryServer = await vite.ssrLoadModule(resolve('client/entry-server.ts'));
      } else if (isSeo) {
        // 生产环境代码 SEO 测试

        template = seoTemplate;
        entryServer = seoRender;
      } else {
        // 生产环境代码

        if (await isSpider(req)) {
          template = seoTemplate;
        } else {
          res.status(200).set({ 'Content-Type': 'text/html' }).end(spaTemplate);
          return;
        }
        entryServer = seoRender;
      }

      // SSR 渲染

      // 获取实例
      let vm;
      if (usePool) {
        vm = AppList.shift();
        if (!vm) {
          vm = entryServer.createApp();
        }
      } else {
        vm = entryServer.createApp();
      }

      /**
       * appHtml HTML 代码
       * preloadLinks 头部 Links （html）
       * meta 头部 meta 信息（html）
       */
      const [appHtml, preloadLinks, meta] = await entryServer.render(vm, url, manifest);

      // 保存实例
      if (AppList.length < maxLen) {
        AppList.push(vm);
      }

      const html = template
        .replace(`<!--meta-->`, meta)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}

createServer().then((app) => {
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
