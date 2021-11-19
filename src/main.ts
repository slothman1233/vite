import app from './App';
// import ElementPlus from 'element-plus'
// import router from './router/index'

import router, { setupRouter } from './router'; // 路由
import { setupElementPlus } from './common/utils/libs/element';
import { setupVant } from './common/utils/libs/vant';
import { setupStore } from './store';

import './styles/plugin/index.less';
import './styles/public/index.less';
import { setupGlobalCom } from 'comps/index';
import 'virtual:svg-icons-register';
import 'nprogress/nprogress.css';
import './permission'; // permission control

// export const PROJECT_ID = process.env.VUE_APP_PROJECT_ID;
setupRouter(app); // 引入路由

setupStore(app); // 引入状态管理

setupElementPlus(app); // 引入element组件

setupVant(app); // 引入vant组件

setupGlobalCom(app); // 注册全局公用组件

router.isReady().then(() => {
  app.mount('#app');
});
