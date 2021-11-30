# 文件说明 koa2


```
├── bin 启动文件
├── cache 缓存的文件夹
│   ├── redis     redis缓存的文件夹
│   │   ├── _redis.ts  redis的基类文件
│   │   └── test.ts   redis的使用示例
├── common  公共文件
│   ├── config  全局配置文件夹
│   │   ├── env   配置文件夹
│   │   └── constant.ts   全局常量文件
│   ├── decorator  装饰器文件夹
│   │   └── httpMethod.ts   路由装饰器
│   ├── nunjucks  装饰器文件夹
│   │   ├── filter.ts   过滤器配置
│   │   └── index.ts    编译html代码插件
│   ├── type  全局的类型文件夹
│   │   └── type.d.ts   类型文件包含一些  路由模型类型 中间件的模型 等全局需要用到的
│   └── utils   工具文件夹
│       ├── cryp.ts   md5加密
│       ├── env.ts   各种环境判断
│       ├── net.ts   http请求的工具类
│       ├── type_check.ts   类型判断工具类
│       ├── CacheBreakdown.ts   防止缓存击穿的方法
│       └── util.ts   常用的工具
├── controller  用于处理逻辑的文件夹
├── db  用于跟数据库对接的文件
│   ├── mysql  使用mysql原生的方式对接数据库
│   │   ├── dao   数据库语句组合的工具文件夹
│   │   ├── dbHelper.ts   查询数据的组件
│   │   └── dbPool.ts   连接数据的文件
│   └── sequelize   使用 sequelize 方式对接数据库
│       ├── mapping   对应数据库字段的模型结构 (必须已.mapping.ts结尾)
│       ├── tables   公用的底层数据模型
│       ├── index.ts   sequelize 连接创建的入口文件
│       ├── map.ts   所有的数据模型的集合文件
│       ├── sync.ts   创建数据库表的方式 一般情况下直接先在数据库创建表  不推荐通过这个方式创建
│       └── types.ts  sequelize 数据类型
├── middleware  中间件文件夹
│   ├── httpservercache  文件缓存中间件
│   ├── log4js  日志中间件
│   ├── proxy  代理请求中间件
│   └── test.ts   中间件示例
├── model  模型文件夹
├── routes  路由文件夹
│   └── index.ts   路由的示例
├── services  服务文件夹(跟数据库打交道) 获取数据的
├── views  nunjucks模板文件夹
│   ├── error  错误和404页面文件夹
│   ├── shared  部分页和布局页文件夹
│   │   ├── layout   布局页文件夹
│   │   └── sharedView  部分页文件夹
│   │       ├── call   nunjucks的call模板文件夹
│   │       ├── macro   nunjucks的macro模板文件夹
│   │       └── set  nunjucks的set模板文件夹
│   ├── proxy  代理请求中间件
│   └── test.ts   中间件示例
├── wwwroot  静态文件夹
├── app.ts  入口文件
├── router.ts  路由入口
└── servervite.ts  vite服务启动文件

```