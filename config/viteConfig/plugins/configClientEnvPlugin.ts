/**
 *  客户端环境变量初始化
 */

import type { IndexHtmlTransformContext, Plugin } from 'vite';
import path from 'path';

let envName = 'dev';

const transformIndexHtml = (html: string, ctx?: IndexHtmlTransformContext) => {
  return html.replace('@/common/config/dev', `@/common/config/${envName}`);
};

export default (mode: viteMode): Plugin | null => {
  //main文件的位置
  const mainPath = path.resolve(__dirname, '../../../', './client/main.ts');
  switch (mode) {
    case 'dev':
    case 'test':
    case 'pre':
    case 'prod':
    case 'mock':
      envName = mode;
      break;
  }

  return {
    name: 'configClientEnvPlugin',
    enforce: 'pre',
    transform(html, id) {
      if (path.resolve(id) === mainPath) {
        return { code: transformIndexHtml(html), map: null };
      }
    },
    transformIndexHtml,
  };
};
