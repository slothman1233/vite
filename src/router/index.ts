import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

// const app = createApp(App);
const routerHistory = createWebHashHistory();

const Layout = () => import('@/layout/index.vue');

// // Auto generates routes from vue files under ./views
// // https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.glob('./views/*.vue')
// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/views(.*)\.vue$/)[1].toLowerCase()
//   return {
//     path: name === '/home' ? '/' : name,
//     component: pages[path] // () => import('./views/*.vue')
//   }
// })

const PROJECT_ID = window.configModel.VUE_APP_PROJECT_ID;

export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', icon: 'Postcard' },
    children: [
      {
        path: '/home',
        component: import('@/views/index.vue'),
        name: 'Home',
        meta: {
          title: '工作台',
          icon: 'Postcard',
          permission: `${PROJECT_ID}_1`,
        },
      },
    ],
  },
  {
    path: '/demo',
    component: Layout,
    meta: {
      title: '示例',
      inTheBar: true,
      icon: 'Postcard',
    },
    children: [
      {
        path: 'table',
        name: 'demoTable',
        component: import('@/views/demo/table.vue'),
        meta: {
          title: '表格示例',
          inTheBar: true,
          icon: 'Postcard',
          permission: `${PROJECT_ID}_2`,
        },
      },
      {
        path: 'layout',
        name: 'demoLayout',
        component: import('@/views/demo/layout.vue'),
        meta: {
          title: '左右布局',
          inTheBar: true,
          icon: 'Postcard',
          permission: `${PROJECT_ID}_2`,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: import('@/views/login/login.vue'),
  },
  {
    path: '/uploadfile',
    name: 'uploadfile',
    component: import('@/views/uploadfile.vue'),
  },
];

export const statroutes: AppRouteRecordRaw[] = [
  {
    path: '/video',
    component: Layout,
    redirect: '/video/list',
    meta: {
      title: '视频播报',
      inTheBar: true,
      icon: 'Postcard',
    },
    children: [
      {
        path: 'list',
        name: 'VideoList',
        component: import('@/views/video/list/home.vue'),
        meta: {
          title: '视频列表',
          inTheBar: true,
          icon: 'Postcard',
          permission: `${PROJECT_ID}_2`,
        },
      },
    ],
  },
  {
    path: '/qs',
    component: Layout,
    meta: { title: '问答管理', inTheBar: true, icon: 'Postcard' },
    children: [
      {
        path: 'list',
        name: 'QsList',
        component: import('@/views/qs/index.vue'),
        meta: {
          title: '问答列表',
          inTheBar: true,
          icon: 'Postcard',
          permission: `${PROJECT_ID}_5`,
        },
      },
    ],
  },
];

const router: Router = createRouter({
  history: routerHistory,
  routes: routes as RouteRecordRaw[],
});

// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>): void {
  app.use(router);
}
export default router;
