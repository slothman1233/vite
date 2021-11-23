import router, { statroutes, routes } from './router/index';

import NProgress from 'nprogress';

import { getUserInfoCache, isLogin } from './common/utils/permission';
import checkMenuList from './common/utils/permission/checkMenuList';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

NProgress.configure({
  //进度环显示隐藏
  showSpinner: false,
});

router.beforeEach((to, from, next) => {
  const islogin = !!isLogin();
  NProgress.start();

  if (islogin) {
    //注入动态路由
    injectionRouters(to, from, next);

    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
    return;
  }

  if (to.path === '/login') {
    next();
  } else {
    next('/login');
  }

  NProgress.done();
  return;
});

router.afterEach(() => {
  NProgress.done();
});

//注入动态路由
const injectionRouters = (() => {
  //如果首次或者刷新界面
  let registerRouteFresh = true;

  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    //注入动态路由
    if (registerRouteFresh) {
      const userInfoStr = getUserInfoCache();
      if (userInfoStr) {
        const userInfoData = JSON.parse(userInfoStr);
        const route = checkMenuList(userInfoData.menuList, statroutes);
        custAddRoutes(route, '');
        next({ ...to, replace: true });
        registerRouteFresh = false;
      }
    }
  };
})();

/**
 * 动态添加路由
 * import() 使用动态路径
 * 只可以是相对路径
 * import(`@/${componentPath}.vue`)❌
 * import(`/${componentPath}.vue`)❌
 * import(`${componentPath}.vue`)❌
 * import(`./${componentPath}.vue`)❌
 * import(`./views/${componentPath}.vue`)✔
 * https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
 */
const custAddRoutes = (routes: AppRouteRecordRaw[], parentName = ''): void => {
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];

    // console.log(item.path, item.component, slash(parentName) + slash(item.path));
    if (item.path && item.component) {
      const eachRoute: any = {
        path: slash(parentName) + slash(item.path),
        redirect: item.redirect,
        name: item.name || item.path,
        component: item.component,
        meta: item.meta,
      };

      // console.log(parentName);
      if (parentName) {
        router.addRoute(parentName, eachRoute);
      } else {
        router.addRoute(eachRoute);
      }

      if (item.children && item.children.length) {
        custAddRoutes(item.children, item.path);
      }
    }
  }
};

function slash(str: string) {
  if (str.length <= 0) return '';
  return str.charAt(0) === '/' ? str : `/${str}`;
}

/**
 * 根据component 获取真实的模块
 * 不适用import.meta.glob为异步
 * @returns
 */
function getMoulesByRoute(): Function {
  // 把所有的数据读出来
  const modulesGlob = import.meta.globEager('./views/**/**.vue');
  // console.log(1, modulesGlob);
  return (componentStr: string): any => {
    // console.log(2, componentStr);
    let finalComp = null;
    Object.keys(modulesGlob).some((key) => {
      if (key === componentStr) {
        // console.log(222, componentStr);
        finalComp = modulesGlob[key].default;
        return true;
      }
    });
    return finalComp;
  };
}
