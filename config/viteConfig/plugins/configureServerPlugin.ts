/**
 *  客户端环境变量初始化
 */

import type { Plugin } from 'vite';

import { Next } from 'koa';

export default (): Plugin | null => {
  return {
    name: 'configure-server',
    configureServer(server: any) {
      // 返回一个在内部中间件安装后
      // 被调用的后置钩子
      return () => {
        server.middlewares.use((req: Request, res: Response, next: Next) => {
          // 自定义请求处理...
          // console.log(1);
          console.log(1111, req.url);
          if (req.url === '/home') {
            console.log(res.body);
          }
          next();
        });
      };
    },
  };
};
