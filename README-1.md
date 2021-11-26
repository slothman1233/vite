# Vue 3 + Typescript + Vite + SSR

此项目 SSR 部分仅针对蜘蛛爬虫进行服务端渲染，渲染时删除 js 引用。如果需要首屏加速，请自行优化。

## 一、SEO渲染 ##

SEO渲染主要需要解决两个问题：

#### 1、异步数据加载问题 ###

这个问题解决很简单，Vue 3 中 setup 方法，返回如果不是 Object 对象而是一个 Promise，那么服务端渲染时会 await 等待数据获取结束，再进行页面渲染。因此封装了一个setupData方法，用法如下：

```javascript
import {defineComponent} from 'vue'
import setupData from '../plugin/setupData'

export default defineComponent({
    name: "index",
    setup() {
        // 函数封装很简单，参数格式自行查看源码
        return setupData({
            info: {
                url: ''
            },
        }, {
            title: 'setupData'
        });
    }
})
```

#### 2、title 和 meta ###

使用 /src/plugin/meta.ts 插件解决此问题，用法如下：

```javascript
import {defineComponent} from 'vue'
import {myMeta, usMeta} from '/src/plugin/meta'

export default defineComponent({
    mixins: ['myMeta'],
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

## 二、运行环境 ##
```shell
# 开发环境，SPA
npm run dev

# 开发环境，SEO，不引入样式，页面看起来很乱，只需要查看axios异步数据是否加载就行
npm run dev:seo

# 打包
npm run build

# 生产模式 seo 测试，需要先打包。引入样式，页面效果基本与SEO快照一致
npm run seo

# 生产模式，需要先打包
npm run start

# 生产模式 pm2 管理发布，自动拉取代码、打包并重启服务
npm run pm2

```

## 二、自定义组件 ##
对于比较简单的页面，可使用 listData 和 infoData 以简化页面代码。
#### 1、listData ###
```vue
<template>
  <list-data url="" :params="{}"></list-data>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ListData from "../components/ListData.vue";

export default defineComponent({
  name: "Page",
  components: {ListData}
})
</script>
```
#### 1、infoData ###
```vue
<template>
  <info-data url="" :params="{}"></info-data>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import InfoData from "../components/InfoData.vue";

export default defineComponent({
  name: "Page",
  components: {InfoData}
})
</script>
```
