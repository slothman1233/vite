/**
 * 针对 index.html，提供压缩和基于 ejs 模板功能
 */
import type { Plugin } from 'vite';

import html from 'vite-plugin-html';

// import pkg from '../../../package.json';

export default function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  // const getAppConfigSrc = () => {
  //     return `${path || '/'}_app.config.js?v=${pkg.version}-${new Date().getTime()}`;
  // };

  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      //将数据注入ejs模板
      injectData: {
        title: VITE_GLOB_APP_TITLE,
      },
      //  标签注入到HTML中  默认位置是 head 前
      // tags: isBuild ? [
      //     {
      //         injectTo:"body",
      //         tag: 'script',
      //         attrs: {
      //             src: getAppConfigSrc(),
      //         },
      //     },
      // ] : []
    },
  });
  return htmlPlugin;
}
