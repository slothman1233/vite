import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';



let app = defineComponent({
	name: 'App',
	setup() {
		return () => <RouterView></RouterView>;
	}
});






export default app