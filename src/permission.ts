import router from './router/index';

import NProgress from 'nprogress';

import { isLogin } from './common/utils/permission';

NProgress.configure({
  //进度环显示隐藏
  showSpinner: false,
});
// const obtainModules = getMoulesByRoute();

router.beforeEach((to: any, from: any, next: any) => {
  const islogin = !!isLogin();
  NProgress.start();

  if (islogin) {
    next();
    return;
  }

  // console.log(islogin);
  if (to.path === '/login') {
    next();
  } else {
    next('/login');
  }

  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});
