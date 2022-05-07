# 基于 vite+vue3+mock的web端框架
安装npm 依赖  必须使用 npm install --force 安装

运行要求
```bash
node版本 v16.13.0
npm版本 8.0.0以上
```

命令介绍
```bash
npm run dev     -----  运行dev环境
npm run test  -----  运行test 环境
npm run pre -----  运行pre 环境
npm run ga  -----  运行ga 环境
npm run mock  -----  运行mock数据的环境
npm run build ----- 打包生产代码
npm run build:mock ----- 打包生产代码带mock的
npm run serve ----- 运行生产代码
```

dock命令
```bash
docker build -t vite . --build-arg env=pre --tag op:1

docker run -d -p :5000:5050  op:1 
```

开发方式
```bash
1.在views里面创建vue的页面 
2.在routes里面创建对应的路由
```

创建页面说明（示例在view里面的qs）
```bash

页面文件夹
│   ├── index 页面
│   ├── model 当前页面的模型文件
│   ├── components 针对当前页面的 控件文件夹
│   │   └──  cpmDemo 控件 文件名 
│   │   │   ├── index 控件页面
│   │   │   └── model 当前控件的模型文件

```

目录说明
```
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
├── dist  生产代码文件夹
├── mock  mock文件(带有"_"开头的文件不会注入   请求地址必须是哦那个src/services/RequestPathName.ts里面的地址)
│   ├── demo  mock示例
│   ├── _createProductionServer.ts  mock注入初始化
│   └── _util.ts 基础模型
├── public  静态文件夹
├── src
│   ├── common 公共部分
│   │   ├── config 针对客户端的环境配置文件夹
│   │   ├── utils 通用文件夹
│   │   │   ├── libs 插件的文件夹(默认注入了element和vant)
│   │   │   └── index.less 全局注入的样式
│   ├── components 组件文件夹 (文件夹名为组件名---只有文件夹下的index.ts的default为对应的组件方法)
│   │   ├── SvgIcon    svg组件 
│   │   ├── HelloWorlds    组件示例 
│   │   │   └── index.ts   组件实现
│   │   └── HelloWorld.vue     可以删除
│   ├── layout 布局文件夹
│   │   ├── components 布局的组件文件夹
│   │   └── index.ts 布局页示例
│   ├── router 路由
│   ├── services api请求文件夹
│   │   ├── http axios求请求插件
│   │   ├── randomDataService 请求示例
│   │   ├── https 请求单例初始化
│   │   └── RequestPathName.ts 请求地址(mock和请求使用)
│   ├── store 状态管理文件夹
│   │   ├── interface 模型声明
│   │   ├── modules 状态管理实现文件夹(每新建个文件需要在interface/index 进行声明)
│   │   ├── index 状态管理初始化和注入文件夹
│   │   └── mutation-types 状态管理静态变量文件
│   ├── styles 样式文件夹
│   │   ├── plugin 插件的样式文件夹
│   │   │   └── index.less 全局注入的样式(默认注入了element和vant)
│   │   ├── public 全局样式
│   │   │   ├── common 样式变量
│   │   │   │   └── index.less 全局函数式样式（默认注入）
│   │   │   └── index.less 全局默认样式（默认注入）
│   ├── views vue页面
│   │   ├── qs 示例页面
│   │   │   ├── index 页面
│   │   │   ├── model 当前页面的模型文件
│   │   │   ├── components 针对当前页面的 控件文件夹
│   │   │   │   └──  cpmDemo 控件 文件名 
│   │   │   │   │   ├── index 控件页面
│   │   │   │   │   └── model 当前控件的模型文件
│   ├── App.ts
│   ├── main.ts 
│   ├── types  ts全局声明
│   │   ├── env.d.ts  env 全局配置声明文件
│   │   ├── index.d.ts  全局声明
│   │   └── window.d.ts  window的ts声明
├── .eslintignore  eslint 排除文件
├── .eslintrc.js    eslint  配置
├── prettier.config.js  prettier配置
├── postcss.config.js   postcss配置（废弃，直接在vite.config.ts中的css配置）
└── vite.config.ts vite 服务配置

```

备注
```
eslint 

#安装eslint
npm install --save-dev eslint eslint-plugin-vue

#安装prettier
npm install --save-dev prettier eslint-plugin-prettier @vue/eslint-config-prettier

#安装typescript支持
npm install --save-dev @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser

vscode 首选项 -> 设置里面添加 
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "eslint.autoFixOnSave" : true,
}

```
