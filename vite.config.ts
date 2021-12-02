import { defineConfig, loadEnv } from 'vite';

import path from 'path';
import proxy from './config/viteConfig/proxy';
import plugins from './config/viteConfig/plugins/plugins';
// https://vitejs.dev/config/

import { wrapperEnv } from './client/common/utils/env';

import autoprefixer from 'autoprefixer';

//env根路径
const envDir = path.resolve(process.cwd(), 'config/env');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';

  const env = loadEnv(mode, envDir);

  const viteEnv = wrapperEnv(env);

  const isProduction = isBuild && (mode === 'mock' || mode === 'pord');

  const {
    VITE_OUTDIR,
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PUBLICDIR,
    VITE_PUBLICDIR_OUT,
    VITE_HOST,
  } = viteEnv;

  return {
    css: {
      postcss: {
        plugins: [
          //自动补全
          //规则在 package.json -> browserslist 中
          autoprefixer({
            add: true,
            grid: true,
          }),
        ],
      },
      preprocessorOptions: {
        // scss: {
        //   additionalData: '@import "./client/assets/style/index.scss";'
        // }

        //注入全局less变量
        less: {
          javascriptEnabled: true,
          additionalData: `@import (reference) "./client/styles/public/common/index.less";`,
        },
      },
    },
    /**
     * 在生产环境中提供的基本公共路径。
     * @default '/'
     */
    base: VITE_PUBLIC_PATH,

    resolve: {
      // 目录别名
      alias: {
        '@': path.resolve('client'),
        comps: path.resolve('client/components'),
        services: path.resolve('client/services'),
        views: path.resolve('client/views'),
        store: path.resolve('client/store'),
        router: path.resolve('client/router'),
        styles: path.resolve('client/styles'),
        mock: path.resolve('mock'),
      },
    },

    publicDir: VITE_PUBLICDIR,

    root: (() => {
      return process.cwd();
    })(),

    server: {
      // 是否自动打开浏览器
      open: true,
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: VITE_HOST,
      // 服务器端口号
      port: VITE_PORT,
      // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 为开发服务器配置 CORS
      cors: true,
      // 设置为 true 强制使依赖预构建
      force: true,
      // 反向代理
      proxy: proxy,
    },

    build: {
      //浏览器兼容性
      target: 'es2015',

      // 压缩
      minify: isProduction ? 'esbuild' : false,

      //静态文件的输出目录
      assetsDir: VITE_PUBLICDIR_OUT,

      // 进行压缩计算
      reportCompressedSize: false,

      /**
       * 输出目录
       * @default 'dist'
       */
      outDir: VITE_OUTDIR,

      // manifest: true,

      rollupOptions: {
        //js 和 css 分包
        output: ((mode) => {
          if (mode === 'build:server') return {};
          return {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          };
        })(mode),

        //transform-remove-strict-mode
        // plugins: [
        //   babel({
        //     exclude: 'node_modules/**',
        //     plugins: ['transform-remove-strict-mode'],
        //     externalHelpers: true,
        //   }),
        // ],
        // 多入口文件打包
        // input: {
        //   main: path.resolve(__dirname, 'index.html'),
        //   aa: path.resolve(__dirname, 'html/aa/aa.html')
        // }
      },

      // 生产环境移除console
      terserOptions: {
        compress: {
          // drop_console: isBuild,
          // drop_debugger: isBuild,
        },
      },
    },
    plugins: plugins(isBuild, <viteMode>mode, viteEnv),
  };
});
