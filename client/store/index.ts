import type { App, InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { RootStateTypes } from './interface/index';
// @ts-ignore
const modulesGlob = import.meta.globEager('./**/*.ts'),
  modules: any = {};
// Set global vuex getters
let getters: any = '';
// Get all the folders under the modules folder,
// traverse the file object to set Vuex modules and getters
Object.keys(modulesGlob).map((key) => {
  if (key.indexOf('modules') >= 0) {
    modules[key.split('/')[key.split('/').length - 1].replace(/\.ts|.js/, '')] =
      modulesGlob[key].default;
  } else {
    getters = modulesGlob[key].default;
  }
});

//  定义注入类型 InjectionKey 将store安装到Vue应用程序时提供类型,将类型传递InjectionKey给useStore方法
const key: InjectionKey<Store<RootStateTypes>> = Symbol();

// Create vuex store
// set modules getters and strict
// https://next.vuex.vuejs.org/
const store = createStore<RootStateTypes>({
  modules,
  getters,
  strict: false,
});

// 将类型注入useStore
export function useStore(): Store<RootStateTypes> {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

// Throw current store
export default store;
