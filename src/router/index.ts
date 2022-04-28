import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';

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

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue'),
        name: 'Home',
        meta: {
          auth: ['admin', 'test'],
          icon: 'carbon:rule-test',
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: '首页',
          index: '1',
        },
      },
    ],
  },
  {
    path: '/qs',
    component: Layout,
    redirect: 'qs',
    children: [
      {
        path: 'index',
        name: 'index',
        component: import('@/views/qs/index.vue'),
        meta: {
          auth: ['admin', 'test'],
          icon: 'carbon:rule-test',
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: '首页',
          index: '1',
        },
      },
    ],
  },
];

const router = createRouter({
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
