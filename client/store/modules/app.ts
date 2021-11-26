import { Module } from 'vuex';
import { App, RootStateTypes } from '../interface/index';
import { App as Apps } from '../mutation-types';

export interface State {
  count: 0;
}

const app: Module<App, RootStateTypes> = {
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    [Apps.mutations.INCREMENT](state: App) {
      state.count++;
    },
  },
  actions: {
    async [Apps.action.CHANGECOUNT]({ commit }, num: App) {
      console.log('app.ts receive num is :', num);
      commit(Apps.mutations.INCREMENT, num);
    },
  },
};

export default app;
