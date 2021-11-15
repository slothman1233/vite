# 基于 vite+vue3+mock的web端框架



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

开发方式
```bash
1.在views里面创建vue的页面 
2.在routes里面创建对应的路由
```

目录说明
```
├── config  vite的配置文件
│   ├── env  vite运行下的配置文件夹
│   └── viteConfig vite配置
│   │   ├── plugins     plugins配置文件夹
│   │   └── proxy.ts   代理配置
├── dist  生产代码文件夹
├── mock  mock文件(带有"_"开头的文件不会注入   请求地址必须是哦那个src/services/RequestPathName.ts里面的地址)
│   ├── demo  mock示例
│   ├── _createProductionServer.ts  mock注入初始化
│   └── _util.ts 基础模型
├── public  静态文件夹
├── src
│   ├── components 组件文件夹 (文件夹名为组件名---只有文件夹下的index.ts的default为对应的组件方法)
│   │   ├── HelloWorlds    组件实例 
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
│   │   └── index.less 全局注入的样式(默认注入了element和vant)
│   ├── utils 通用文件夹
│   │   ├── libs 插件的文件夹(默认注入了element和vant)
│   │   └── index.less 全局注入的样式
│   ├── views vue页面
│   ├── App.ts
│   ├── main.ts 
│   ├── types  ts全局声明
│   │   ├── env.d.ts  env 全局配置声明文件
│   │   ├── index.d.ts  全局声明
│   │   └── window.d.ts  window的ts声明
├── tsconfig.json ts的配置文件
└── vite.config.ts vite 服务配置

```