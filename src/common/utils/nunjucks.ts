/* nunjucksMiddleware.js 中间件的编写
 *什么是中间件: 中间件就是在程序执行过程中增加辅助功能
 *nunjucksMiddleware作用: 给请求上下文加上render方法 将来在路由中使用
 */

import htmlMinifier from 'html-minifier';
// import LRU from 'lru-cache'

import { isDev } from './env';
import { Context, Next } from 'koa';
import nunjucks from 'nunjucks';
import path from 'path';

import { filter, constant } from '../nunjucks/index';
import { COPYFILE_EXCL } from 'constants';

import stringify from 'fast-json-stringify';
import hFilter from '../nunjucks/htmlTemplate';

const hf = hFilter;

type paramsModel = {
  ext?: string; //文件后缀
  path?: string; //文件夹全路径
};

// const options = {
//     max: 500,
//     length: function (n: any, key: any) {return n * 2 + key.length },
//     dispose: function (key: any, n: any) {  n.close() },
//     maxAge: 1000 * 60 * 60
// }
// const microCache = new LRU(options)

const resolvePath = (params: paramsModel = {}, filePath: string): string => {
  let ext = '.njk';
  //判断首字母是不是. 不是则补全
  if (params.ext) {
    if (!/^\./.test(params.ext)) {
      ext = `.${params.ext}`;
    } else {
      ext = params.ext;
    }
  }

  // 判断文件是否有html后缀
  const isHtmlReg = new RegExp(ext);

  filePath = isHtmlReg.test(filePath) ? filePath : filePath + ext;
  return path.resolve(params.path || '', filePath);
};

export const nunjucksEVN = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, '..', '..', 'views'), {
    watch: true,
    noCache: isDev ? true : false, //如果为 true，不使用缓存，模板每次都会重新编译。
    // noCache: false
  }),
  {
    throwOnUndefined: false,
    autoescape: true, // 开启转义,防止XSS
  },
);

/**
 * 注入过滤器
 */
filter(nunjucksEVN);
/**
 * 注入全局静态变量
 */
constant(nunjucksEVN);

/**
 * @description nunjucks中间件 添加render到请求上下文
 * @param params {}
 */

//ext
export default (params: paramsModel) => {
  return async (ctx: Context, next: Next) => {
    ctx.render = async (filePath, renderData = {}) => {
      // ctx.type = 'text/html'
      // const md5 = `${filePath}_${JSON.stringify(renderData)}`
      let html = '';
      // const getCache = microCache.get(md5)
      // if (getCache) {
      //     html = getCache
      // } else {
      //     html = htmlMinifier.minify(
      //         nunjucksEVN.render(resolvePath(params, filePath), Object.assign({}, ctx.state, renderData)),
      //         {
      //             collapseWhitespace: true
      //         }
      //     )
      //     microCache.set(md5, html)
      // }

      html = htmlMinifier.minify(
        nunjucksEVN.render(resolvePath(params, filePath), Object.assign({}, ctx.state, renderData)),
        {
          collapseWhitespace: true,
        },
      );

      html = await getWUCHtml(html);

      ctx.body = html;
    };

    // 中间件本身执行完成 需要调用next去执行下一步计划
    return next();
  };
};

//获取部分页的html处理
async function getWUCHtml(str: string): Promise<string> {
  const data: any[] = [];
  let i = 0;
  str = str.replace(/{@{(.*?)}@}/gi, function ($1: string, $2: string): string {
    const strs = '@{@' + i + '@}@';
    data.push({
      reg: $1,
      funStr: $2.trim(),
      indexStr: strs,
    });
    //  str = str.replace($1, strs)
    i++;
    return strs;
  });

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const html = await hf.getHtml(item.funStr);
    str = str.replace(item.indexStr, html);
  }
  return str;
}
