/* eslint-disable no-dupe-else-if */
/* eslint-disable no-empty */
import { Context, Next } from 'koa';
import fs from 'fs-extra';
import { getType } from 'mime';
import Path from 'path';

/**
 * http server缓存设置
 * @param ctx
 * @param next
 */
async function httpservercache(ctx: Context, next: Next) {
  const { path } = ctx;
  if (/\S*\.(jpe?g|png|gif|css)$/.test(path)) {
    await responseFile(Path.resolve(__dirname, '..', '..', 'wwwroot', `.${path}`), ctx);
    return;
  } else if (/\S*\.(jpe?g|png|gif|css)$/.test(path)) {
  }

  //样式
  // if (/\S*\.css$/.test(path)) {
  //     await styleRouter(ctx, next)
  //     return
  //     //图片的缓存
  // } else if (/\S*\.(jpe?g|png|gif)$/.test(path)) {
  //     await imageRouter(ctx, next)
  //     return
  // }
  ///不允许使用强缓存
  // response.set('cache-control', '120')
  // ctx.type = mime.getType(path)
  //response.set('expires', new Date(Date.now() + 40 * 60 * 1000).toString())

  await next();
}
const responseFile = async (path: any, ctx: any, encoding?: any) => {
  const { response } = ctx;
  const fileContent = await fs.readFile(path, encoding);
  response.set('expires', new Date(Date.now() + 2 * 60 * 1000).toString());
  ctx.type = `${getType(path)}; charset=utf-8 `;
  ctx.body = fileContent;
};

const styleRouter = async (ctx: Context, next: Next) => {
  const { path } = ctx;
  await responseFile(Path.resolve(__dirname, '..', '..', 'wwwroot', `.${path}`), ctx, 'UTF-8');
};

const imageRouter = async (ctx: Context, next: Next) => {
  const { path } = ctx;
  await responseFile(Path.resolve(__dirname, '..', '..', 'wwwroot', `.${path}`), ctx);
};

export default httpservercache;
