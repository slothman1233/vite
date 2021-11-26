import { createSSRApp, createApp as _createApp } from 'vue';
import App from './App';
// import { createRouter } from './router'
import createMeta from './plugin/meta';
import createAxios from './plugin/axios';

import router, { setupRouter } from './router'; // 路由
import { setupElementPlus } from './common/utils/libs/element';
import { setupVant } from './common/utils/libs/vant';
import { setupStore } from './store';

import './styles/plugin/index.less';
import './styles/public/index.less';
import { setupGlobalCom } from 'comps/index';
import 'virtual:svg-icons-register';

//不能修改
import env from '@/common/config/dev';

export function createApp(ssr: boolean) {
  const app = ssr ? createSSRApp(App) : _createApp(App);
  // const router = createRouter()
  const myMeta = createMeta();
  const myAxios = createAxios();

  app.use(router);
  app.use(myMeta, { mixin: false });
  app.use(myAxios);

  if (!import.meta.env.SSR) {
    window.configModel = env;
  }

  setupRouter(app); // 引入路由

  setupStore(app); // 引入状态管理

  setupElementPlus(app); // 引入element组件

  setupVant(app); // 引入vant组件

  setupGlobalCom(app); // 注册全局公用组件

  return app;
}
