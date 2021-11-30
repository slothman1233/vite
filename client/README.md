# 目录说明 vite+vue3
```
├── common 公共部分
│   ├── config 针对客户端的环境配置文件夹
│   ├── utils 通用文件夹
│   │   ├── libs 插件的文件夹(默认注入了element和vant)
│   │   └── index.less 全局注入的样式
├── components 组件文件夹 (文件夹名为组件名---只有文件夹下的index.ts的default为对应的组件方法)
│   ├── SvgIcon    svg组件 
│   ├── HelloWorlds    组件示例 
│   │   └── index.ts   组件实现
│   └── HelloWorld.vue     可以删除
├── layout 布局文件夹
│   ├── components 布局的组件文件夹
│   └── index.ts 布局页示例
├── router 路由
├── services api请求文件夹
│   ├── http axios求请求插件
│   ├── randomDataService 请求示例
│   ├── https 请求单例初始化
│   └── RequestPathName.ts 请求地址(mock和请求使用)
├── store 状态管理文件夹
│   ├── interface 模型声明
│   ├── modules 状态管理实现文件夹(每新建个文件需要在interface/index 进行声明)
│   ├── index 状态管理初始化和注入文件夹
│   └── mutation-types 状态管理静态变量文件
├── styles 样式文件夹
│   ├── plugin 插件的样式文件夹
│   │   └── index.less 全局注入的样式(默认注入了element和vant)
│   ├── public 全局样式
│   │   ├── common 样式变量
│   │   │   └── index.less 全局函数式样式（默认注入）
│   │   └── index.less 全局默认样式（默认注入）
├── views vue页面
├── App.tsx
├── entry-client.ts
├── entry-server.ts
└── main.ts 

#### 2、title 和 meta ###

使用 common/utils/libs/meta.ts 插件解决此问题，用法如下：

```javascript
import {defineComponent} from 'vue'
import {myMeta, usMeta} from '/src/plugin/meta'

export default defineComponent({
    mixins: [myMeta],
    // 1、使用 head 方法
    head() {
        return {
            title: this.title,
            metas: [
                {
                    name: 'description',
                    content: 'description'
                },
                {
                    name: 'keywords',
                    content: 'keywords'
                },
                {
                    property: 'og:title',
                    content: this.title
                },
                {
                    property: 'og:description',
                    content: 'ogDescription'
                }
            ],
        }
    },
    setup() {
        // 2、使用 usMeta 方法
        const myMeta = usMeta();
        myMeta.setHead({
            title: 'title & meta',
        });
        return {
            title: 'title & meta'
        }
    },
    mounted() {
        // 3、使用 $myMeta 属性
        this.$myMeta.setHead({
            title: 'title & meta',
        });
    }
})

// 也可以设置 mixin = true 把 myMeta 添加到全局 mixin
app.use(myMeta, {mixin: true})
```