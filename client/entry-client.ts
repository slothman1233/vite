import { createApp } from './main';
import router from './router'; // 路由
const app = createApp(false);
// app.mount('#app');
router.isReady().then(() => {
  app.mount('#app');
});
