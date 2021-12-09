# 基于 koa+vite+vue3+mock的ssr web端框架

运行要求
```bash
node版本 v16.13.0
npm版本 8.0.0以上
```

附加说明
```bash

  默认去掉了掉redis 跟mysql的连接 需要的话 

1.在app.ts
 sequelizeInit()

  store: redisStore({
       port: redisConf.port,
       host: redisConf.host
   })

   恢复这两段
1. 在common/config/env 文件修改mysql个redis对应的配置即可
```


命令介绍
```bash
http://localhost:2000/
npm run dev     -----  运行dev环境
npm run test  -----  运行test 环境
npm run pre -----  运行pre 环境
npm run prod  -----  运行ga 环境
npm run mock  -----  运行mock数据的环境

本地不打包运行seo代码 没有样式文件和js文件 只关注 是不是服务端渲染
http://localhost:2000/
npm run dev:seo     ----- ssr 运行dev环境
npm run test:seo  ----- ssr 运行test 环境
npm run pre:seo ----- ssr 运行pre 环境
npm run prod:seo  -----  ssr 运行ga 环境
npm run mock:seo  -----  ssr 运行mock数据的环境

npm run build ----- 打包生产环境代码
npm run build:dev ----- 打包开发环境代码
npm run build:test ----- 打包测试代码
npm run build:pre ----- 打包已发布代码
npm run build:prod ----- 打包生产代码


需要先打包然后运行 http://localhost:8087/
npm run start ----- 运行打包后的生产代码
npm run start:dev ----- 运行打包后的开发代码
npm run start:test ----- 运行打包后的测试代码
npm run start:pre ----- 运行打包后的预发布代码
npm run start:prod ----- 运行打包后的生成代码


npm run docker ----- docker下 运行打包后的生产代码
npm run docker:dev ----- docker下 运行打包后的开发代码
npm run docker:test ----- docker下 运行打包后的测试代码
npm run docker:pre ----- docker下 运行打包后的预发布代码
npm run docker:prod ----- docker下 运行打包后的生成代码

```


目录说明
```
├── client vue代码 详细介绍看文件夹里面的md文件
├── config  vite的配置文件
│   ├── env  vite运行下的配置文件夹
│   └── viteConfig vite配置
│   │   ├── plugins     plugins配置文件夹
│   │   │   ├── configClientEnvPlugin 客户端环境变量初始化
│   │   │   ├── configCompressPlugin 使用 gzip 或者 brotli 来压缩资源
│   │   │   ├── configEslintPlugin vite 配置 eslint
│   │   │   ├── configHtmlPlugin 针对 index.html，提供压缩和基于 ejs 模板功能
│   │   │   ├── configLegacyPlugin  js的兼容性处理
│   │   │   ├── configMockPlugin Mock处理
│   │   │   ├── configStyleImportPlugin element vant  组件注入处理
│   │   │   ├── configSvgIconsPlugin   svg 处理
│   │   │   └── plugins.less vite.config.ts  中的 plugins 配置入口
│   │   └── proxy.ts   代理配置
├── dist  koa生产代码文件夹
├── mock  mock文件(带有"_"开头的文件不会注入   请求地址必须是client/services/RequestPathName.ts里面的地址)
│   ├── demo  mock示例
│   └── _createProductionServer.ts  mock注入初始化
├── public  静态资源文件夹
├── publicommon web client 通用文件夹
│   ├── model  模型文件夹
│   └── utils  通用插件文件夹
├── src koa 代码文件夹 详细介绍看文件夹里面的md文件
├── types  ts全局声明
│   ├── clientEnv.d.ts  vue 环境配置文件说明
│   ├── env.d.ts  env 全局配置声明文件
│   ├── index.d.ts  全局声明
│   ├── shims-vue.d.ts  vue声明
│   └── window.d.ts  window的ts声明
├── vitedist  vite生产代码文件夹
├── run  vite复制的生产代码文件夹
├── docker-compose.yml  docker-compose 文件  
├── Dockerfile  docker的配置文件
├── jest.config.js  jest 配置文件
├── jest.setup.js   jest 的脚本文件
├── nodemon.json  nodemon的配置文件
├── pm2.conf.json pm2的配置文件
├── tsconfig.json ts的配置文件
├── .eslintignore  eslint 排除文件
├── .eslintrc.js    eslint  配置
├── prettier.config.js  prettier配置
├── postcss.config.js   postcss配置（废弃，直接在vite.config.ts中的css配置）
└── vite.config.ts vite 服务配置

```
# docker命令
```
docker build -t koa . --build-arg env=test --tag koa:1
docker run -d -p 8081:80 --name vite  koa:1

然后浏览器打开 http://localhost:8081/ 

```

备注
```
eslint 

vscode 首选项 -> 设置里面添加 
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "eslint.autoFixOnSave" : true,
}

--------------- 不用安装 -------------------
#安装eslint
npm install --save-dev eslint eslint-plugin-vue

#安装prettier
npm install --save-dev prettier eslint-plugin-prettier @vue/eslint-config-prettier

#安装typescript支持
npm install --save-dev @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser

```