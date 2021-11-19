import { routes } from '@/router/index';
import { Module } from 'vuex';
import { permissionListState, RootStateTypes } from 'store/interface/index';
import { RouteRecordRaw } from 'vue-router';
import mutationTypes from '../mutation-types';

const permissionModule: Module<permissionListState, RootStateTypes> = {
  state: {
    routeList: [],
    addRoutes: [],
  },
  mutations: {
    [mutationTypes.mutations.SET_ROUTES]: (state, route) => {
      state.addRoutes = route;
      let resRoutelist: RouteRecordRaw[] = routes.filter((e) => e.name !== 'root');
      const getRootList = routes.find((e) => e.name === 'root');
      if (getRootList && getRootList !== undefined) {
        resRoutelist = resRoutelist.concat(getRootList.children ? getRootList.children : []);
      }

      state.routeList = resRoutelist.concat(route);
    },
  },
  actions: {
    // 生成路由
    [mutationTypes.action.GenerateRoutes](context) {
      const { commit } = context;
      return new Promise((resolve) => {
        const modulesObtainJson = import.meta.glob('../../../public/*.json');
        modulesObtainJson['../../../public/testMenu.json']().then((mod) => {
          const accessedRoutes = mod.default;
          commit(mutationTypes.mutations.SET_ROUTES, accessedRoutes);
          resolve(accessedRoutes);
        });

        // fetch("testMenu.json").then(res => {
        // 	return res.json();
        // }).then(res => {
        // 	if (typeof res === 'string') {
        // 		res = JSON.parse(res)
        // 	}
        //   const accessedRoutes = res;
        //   commit('SET_ROUTES', accessedRoutes)
        //    resolve(accessedRoutes)
        // })

        // 向后端请求路由数据
        // getRouters().then(res => {
        //   const accessedRoutes = filterAsyncRouter(res.data)
        //   accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        //   commit('SET_ROUTES', accessedRoutes)
        //   resolve(accessedRoutes)
        // })
      });
    },
  },
};

export default permissionModule;
