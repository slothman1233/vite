import { App, inject } from 'vue';

export default function createconfigModel(env: clientEnv) {
  return {
    install(app: App) {
      // axios 封装优化
      const $configModel = (function () {
        //@ts-ignore
        if (!import.meta.env.SSR) {
          window.configModel = env;
        }
        return env;
      })();
      app.provide('configModel', $configModel);
      app.config.globalProperties.$configModel = $configModel;
    },
  };
}

// 在 使用getConfigModel 里使用
export function getConfigModel(): clientEnv {
  return inject('configModel');
}

export function setupConfigmodel(app: App<Element>, env: clientEnv) {
  const configmodel = createconfigModel(env);
  app.use(configmodel);
}
