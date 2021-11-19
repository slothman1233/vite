import { Module } from 'vuex';
import { App, RootStateTypes } from '../interface/index';
import mutationTypes from '../mutation-types';

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
    [mutationTypes.mutations.INCREMENT](state: App) {
      state.count++;
    },
  },
  actions: {
    async [mutationTypes.action.CHANGECOUNT]({ commit }, num: App) {
      console.log('app.ts receive num is :', num);
      commit(mutationTypes.mutations.INCREMENT, num);
    },
  },
};

export default app;
