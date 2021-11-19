import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { createApp } from 'vue'

//不能修改
import env from '@/common/config/dev'



let app = createApp(defineComponent({
	name: 'App',
	setup() {
		return () => <RouterView></RouterView>;
	}
}));

app.config.globalProperties.$configmodel = env;

window.configModel = env;



export default app