import { defineConfig, loadEnv } from 'vite'


import path from 'path'
import proxy from './config/viteConfig/proxy'
import plugins from './config/viteConfig/plugins/plugins'
// https://vitejs.dev/config/


import { wrapperEnv } from './src/utils/env'

//env根路径
const envDir = path.resolve(process.cwd(), "config/env")

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'

  const env = loadEnv(mode, envDir)

  const viteEnv = wrapperEnv(env)


  const isProduction = mode === 'production'


  const { VITE_OUTDIR, VITE_PORT, VITE_PUBLIC_PATH, VITE_USE_MOCK, VITE_PUBLICDIR, VITE_PUBLICDIR_OUT, VITE_HOST } = viteEnv

  return {


    // 引用全局 scss
    cssPreprocessOptions: {
      // scss: {
      //   additionalData: '@import "./src/assets/style/index.scss";'
      // }
    },


    /**
   * 在生产环境中提供的基本公共路径。
   * @default '/'
   */
    base: VITE_PUBLIC_PATH,


    resolve: {
      // 目录别名
      alias: {
        '@': path.resolve('src'),
        comps: path.resolve('src/components'),
        services: path.resolve('src/services'),
        views: path.resolve('src/views'),
        store: path.resolve('src/store'),
        router: path.resolve('src/router'),
        styles: path.resolve('src/styles'),
        mock: path.resolve('mock'),
      },
    },

    publicDir: VITE_PUBLICDIR,

    root: (() => {
      return process.cwd()
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
      // 压缩
      minify: isProduction ? "esbuild" : false,
      //静态文件的输出目录
      assetsDir: VITE_PUBLICDIR_OUT,
      // 进行压缩计算
      reportCompressedSize: false,
      /**
       * 输出目录
       * @default 'dist'
       */
      outDir: VITE_OUTDIR,

      // rollupOptions: {
      //   input: {
      //     main: path.resolve(__dirname, 'index.html'),
      //     aa: path.resolve(__dirname, 'html/aa/aa.html')
      //   }
      // },

    },
    plugins: plugins(isBuild, mode, VITE_USE_MOCK),

  }
})
