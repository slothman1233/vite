import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import { ROUTER_MAP } from './common/config/constant';
import { RouteMeta } from './common/type/type';
const { ROUTER_META, CONTROLLER_PATH_METADATA, MIDDLEWARE } = ROUTER_MAP;
import Router from 'koa-router';
import { Context, Next } from 'koa';
import log from './middleware/log4js/log';
import { isDir } from './common/utils/file';
import koaCompose from 'koa-compose';
const modules: any[] = [];
/**
 * 路由的初始化
 * @param {Router} router koa-router
 */
const addRouter = async (router: Router) => {
  const ctrPath = path.join(__dirname, 'routes');
  //扫描controller文件夹，收集所有controller
  await fileScan(ctrPath);

  // 结合meta数据添加路由 和 验证
  modules.forEach((items) => {
    const m = items[0];
    let ControllerPath =
      Reflect.getMetadata(CONTROLLER_PATH_METADATA, m) || items[1].replace(/\\/g, '/') || '';
    ControllerPath = ControllerPath !== '' ? sprit(ControllerPath) : '';
    const middlewares = Reflect.getMetadata(MIDDLEWARE, m) || '';
    const RouteMap: Array<RouteMeta> = Reflect.getMetadata(ROUTER_META, m);
    RouteMap.map((item) => {
      const { name, path: ActionPath, method } = item;
      const ctr = new m();
      const RoutePath = ControllerPath + sprit(ActionPath);
      const methods: Array<any> = middlewares[name] || [];
      router[method](RoutePath, koaCompose(methods), ctr[name]);
    });
  });
};

async function fileScan(filepath: string) {
  const fileArg: string[] = fs.readdirSync(filepath);
  for (let i = 0; i < fileArg.length; i++) {
    const name = fileArg[i];
    let paths = path.join(filepath, name);
    if (await isDir(paths)) {
      await fileScan(paths);
    } else if (/^[^.]+\.(t|j)s$/.test(name)) {
      const ctrPath = path.join(__dirname, 'routes');

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const module = require(paths).default;
      paths = paths.replace(ctrPath, '').replace(paths.substr(paths.lastIndexOf('\\')), '');
      if (module) {
        modules.push([module, paths]);
      }
    }
  }
}

/**
 * 中间件执行的插件
 * @param {Array<AsyncFunction>} methods 中间件的方法数组
 */
function middlewareFn(methods: Array<Function>) {
  const fnAry = methods;
  let ctx: Context;
  let next: Next;
  let index: number;

  return async function (ctxs: Context, nexts: Next) {
    ctx = ctxs;
    next = nexts;
    index = 0;
    try {
      await nextFn();
    } catch (err) {
      log.error({ ctx, error: err, resTime: 0 });
      //有路由但是没有匹配到相应的ejs模板
      //跳转到404
      await ctx.render('error/404');
    }
  };

  //递归执行方法

  async function nextFn() {
    if (fnAry.length < index + 1) {
      await next();
    } else {
      const fn = fnAry[index];
      index++;
      //判断是否是方法如果不是则跳过
      if (typeof fn !== 'function') {
        nextFn();
        return;
      }
      await fn(ctx, nextFn);
    }
  }
}
/**
 * 在字符串头插入  /
 * @param {string} str
 */
function sprit(str: string): string {
  return str[0] === '/' ? str : `/${str}`;
}

export default addRouter;
