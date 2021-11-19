import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

// const app = createApp(App);
const routerHistory = createWebHashHistory();

// console.log(window.configModel);

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

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: { title: '首页', icon: 'el-icon-s-home', permission: 1 },
    children: [
      {
        path: '/home',
        component: () => import('@/views/index.vue'),
        name: 'Home',
        meta: {
          title: '工作台',
          icon: 'el-icon-s-home',
          permission: `${PROJECT_ID}_1`,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
];

export const statroutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '视频播报',
      inTheBar: true,
      icon: 'el-icon-video-camera-solid',
    },
    children: [
      {
        path: 'list',
        name: 'VideoList',
        component: () => import('@/views/login/login.vue'),
        meta: {
          title: '视频列表',
          inTheBar: true,
          icon: 'el-icon-video-play',
          permission: `${PROJECT_ID}_2`,
        },
      },
    ],
  },
];

const router: Router = createRouter({
  history: routerHistory,
  routes: routes,
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
