import vue from '@vitejs/plugin-vue';
//一个自动导入组件库样式的vite插件。
import vueJsx from '@vitejs/plugin-vue-jsx';
import configClientEnvPlugin from './configClientEnvPlugin';
import configCompressPlugin from './configCompressPlugin';
import configEslintPlugin from './configEslintPlugin';
import configHtmlPlugin from './configHtmlPlugin';
import configMockPlugin from './configMockPlugin';
import configSvgIconsPlugin from './configSvgIconsPlugin';
// import autoprefixer from 'autoprefixer';
import configLegacyPlugin from './configLegacyPlugin';
import configureServerPlugin from './configureServerPlugin';
// 以下钩子在服务器启动时被调用：
// options
// buildStart

// 以下钩子会在每个传入模块请求时被调用：
// resolveId
// load
// transform

// 以下钩子在服务器关闭时被调用：
// buildEnd
// closeBundle

export default (isBuild: boolean, mode: viteMode, viteEnv: ImportMetaEnv) => {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  return [
    //客户端环境变量初始化处理
    configClientEnvPlugin(mode),

    vue({
      template: {
        ssr: true,
      },
    }),
    vueJsx(),

    configSvgIconsPlugin(isBuild), // svg 处理

    //使用 gzip 或者 brotli 来压缩资源
    configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),

    //注入mock
    configMockPlugin(VITE_USE_MOCK, isBuild, mode),

    //针对 index.html，提供压缩和基于 ejs 模板功能
    // configHtmlPlugin(viteEnv, isBuild),

    configLegacyPlugin(),

    // configEslintPlugin(),

    // configStyleImportPlugin(isBuild)

    // autoprefixer,
    // configureServerPlugin(),
  ];
};
