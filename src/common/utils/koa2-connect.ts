/**
 * koa2-connect 插件的ts版本
 *  npm插件地址 https://www.npmjs.com/package/koa2-connect
 */

function makeInjectedResponse(koaCtx: any, /*markHandled,*/ whenEnded: any) {
  const res = koaCtx.res;

  res.on('close', whenEnded).on('finish', whenEnded);

  const dummyRes = Object.create(res);
  ['setHeader', 'writeHead', 'write', 'end'].forEach((name) => {
    dummyRes[name] = function (...args: any[]) {
      res[name](...args);
      // koa2.0 initial assign statusCode to 404, reset to 200
      if (res.statusCode === 404) {
        res.statusCode = 200;
      }
      // markHandled();
    };
  });
  ['statusCode', 'statusMessage'].forEach((name) => {
    dummyRes.__defineSetter__(name, function (value: any) {
      res[name] = value;
      // markHandled();
    });
  });

  return dummyRes;
}

function handler(ctx: any, connectMiddleware: any) {
  return new Promise((resolve, reject) => {
    // let hasHandled = false;
    // (req, res)
    const args = [
      ctx.req,
      makeInjectedResponse(
        ctx,
        // () => {
        //   // hasHandled = true;
        // },
        () => {
          resolve(false);
        },
      ),
    ];
    let assumeSync = true;
    // (req, res, next) or (err, req, res, next)
    if (connectMiddleware.length >= 3) {
      args.push((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
      assumeSync = false;
    }
    // (err, req, res, next)
    if (connectMiddleware.length >= 4) {
      args.unshift(null);
    }
    connectMiddleware(...args);
    /**
     * If the middleware function does not declare receiving the `next` callback
     * assume that it's synchronous.
     */
    if (assumeSync /*&& !hasHandled*/) {
      resolve(true);
    }
  });
}

/**
 * koa2-connect 插件的ts版本
 *  npm插件地址 https://www.npmjs.com/package/koa2-connect
 */
export default function koaConnect(connectMiddleware: any) {
  return async (ctx: any, next: any) => {
    ctx.respond = false;
    try {
      const goNext = await handler(ctx, connectMiddleware);
      if (goNext) {
        ctx.respond = true;
        return next();
      }
    } catch (err) {
      ctx.respond = true;
      throw err;
    }
  };
}
