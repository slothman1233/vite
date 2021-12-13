import fs from 'fs';
import koa from 'koa';
import path from 'path';
import vite, { createServer as viteCreateServer } from 'vite';
import { Request } from 'koa';
import koaConnect from './common/utils/koa2-connect';
import koaStatic from 'koa-static';

const root = '../';
// const express = require('express');

// 替换 node Promise，优化项，非必需
// global.Promise = require('bluebird')

const resolve = (p: string) => path.resolve(__dirname, root, p);
/**
 * 是否使用对象池
 * @type {boolean}
 */
const usePool = true;

// 环境
const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev:seo';
const isTest = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:seo';
const isPre = process.env.NODE_ENV === 'pre' || process.env.NODE_ENV === 'pre:seo';
const isMock = process.env.NODE_ENV === 'mock' || process.env.NODE_ENV === 'mock:seo';
const isProd = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'prod:seo';
const isBuild =
  ['dev:start', 'test:start', 'pre:start', 'prod:start', 'mock:start'].indexOf(
    process.env.NODE_VITE,
  ) >= 0;
const isSeo =
  ['dev:seo', 'test:seo', 'pre:seo', 'prod:seo', 'mock:seo', 'mock:seo'].indexOf(
    process.env.NODE_ENV,
  ) >= 0;

/**
 * 复制 vitedist 文件至 run 文件夹下
 * @returns {void}
 */
function cp2run() {
  function copy(from: string, to: string) {
    const files = fs.readdirSync(from);
    for (const i in files) {
      //   files.hasOwnProperty(i);
      if (Object.prototype.hasOwnProperty.call(files, i)) {
        const _src = path.join(from, files[i]);
        const _run = path.join(to, files[i]);

        const _srcStat = fs.statSync(_src);
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
  copy(resolve('vitedist'), resolve('run'));
}

/**
 * 判断是否是爬虫
 * @param req
 * @returns {boolean}
 */
function isSpider(req: Request) {
  // 根据 UA 判断
  // 如果需要防止伪造 UA，还可以继续使用 host 反查
  const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLocaleLowerCase() : '';
  return ua.indexOf('spider') >= 0 || ua.indexOf('bot') >= 0;
}

export default async function createServer(app: koa<koa.DefaultState, koa.DefaultContext>) {
  let vites: vite.ViteDevServer,
    seoRender: any,
    spaTemplate: string,
    seoTemplate: string,
    manifest: any,
    routes: any;

  let template: string, entryServer: any;
  if (!isBuild) {
    let mode = 'dev';
    if (isDev) {
      mode = 'dev';
    } else if (isTest) {
      mode = 'test';
    } else if (isPre) {
      mode = 'pre';
    } else if (isMock) {
      mode = 'mock';
    } else {
      mode = 'prod';
    }
    vites = await viteCreateServer({
      root: process.cwd(),
      mode,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
    });

    // // 使用 vite 的 Connect 实例作为中间件
    app.use(koaConnect(vites.middlewares));

    routes = entryServer = await vites.ssrLoadModule(resolve('./client/entry-server.ts'));
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
    seoTemplate = spaTemplate
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/, '')
      .replace(/<link rel="modulepreload" \b[^>]*>/, '');

    manifest = require(resolve('run/client/ssr-manifest.json'));
    seoRender = routes = require(resolve('run/server/entry-server.js'));
  }

  //引用静态资源
  // maxage -- 浏览器缓存的最大寿命（以毫秒为单位）。默认为0
  // hidden -- 允许传输隐藏文件。默认为false
  // index -- 默认文件名，默认为“ index.html”
  // defer -- 如果为true，则在服务之后return next()，允许任何下游中间件首先响应。 默认 false
  // gzip -- 当客户端支持gzip且所请求的扩展名为.gz的文件存在时，请尝试自动提供文件的gzip压缩版本。默认为true。
  // br -- 当客户端支持brotli并且存在所请求的扩展名为.br的文件时（请注意，仅通过https接受brotli），请尝试自动提供文件的brotli版本。默认为true。
  // setHeaders -- 函数，用于在响应时设置自定义标头。
  // extensions -- URL 中没有扩展名时，尝试匹配传递的数组中的扩展名以搜索文件。首先找到的是送达。（默认为false）
  const staticDir = isBuild ? '/../run/client/' : '/../public/';

  app.use(
    koaStatic(__dirname + staticDir, {
      maxage: isDev ? 0 : 1000 * 10,
      index: false,
      gzip: true,
    }),
  );

  const maxLen = 10;
  const AppList: any[] = [];
  app.use(async (ctx, next) => {
    try {
      const url = ctx.originalUrl;

      //路由不存在直接跳出
      const isRoute = await routes.hasRoute(url);
      if (!isRoute) {
        next();
        return;
      }

      // // TODO 模拟接口测试
      // if (url === '/list.json') {
      //   ctx.status = 200;
      //   ctx.type = 'text/html';
      //   ctx.body = JSON.stringify({
      //     list: ['a', 'b', 'c'],
      //   });

      //   return;
      // }

      if (!isBuild) {
        // 开发环境

        template = fs.readFileSync(resolve('index.html'), 'utf-8');

        template = await vites.transformIndexHtml(url, template);

        // const meta = await entryServer.getMeta(url);
        // template = template.replace(`<!--meta-->`, meta);

        console.log(url);

        if (isSeo) {
          // SEO 同样去掉 JS 代码，否则有 Hydration 警告
          template = template.replace(
            `<script type="module" src="/client/entry-client.ts"></script>`,
            '',
          );
        } else {
          template = template
            .replace(`<!--meta-->`, '')
            .replace(`<!--preload-links-->`, '')
            .replace(`<!--app-html-->`, '')
            .replace(/\n|\r/gi, '');
          ctx.status = 200;
          ctx.type = 'text/html';
          ctx.body = template;

          return;
        }
      } else {
        // 生产环境代码 SEO 测试
        template = seoTemplate;
        entryServer = seoRender;

        if (!(await isSpider(ctx.request))) {
          spaTemplate = spaTemplate
            .replace(`<!--meta-->`, '')
            .replace(`<!--preload-links-->`, '')
            .replace(`<!--app-html-->`, '')
            .replace(/\n|\r/gi, '');
          ctx.status = 200;
          ctx.type = 'text/html';
          ctx.body = spaTemplate;
          return;
        }
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

      ctx.status = 200;
      ctx.type = 'text/html';
      ctx.body = html;
    } catch (e) {
      console.log(e.stack);
      ctx.status = 500;
      ctx.body = e.stack;
      //   res.status(500).end(e.stack);
    }
  });

  return app;
}
