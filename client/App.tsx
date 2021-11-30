import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';



let app = defineComponent({
	name: 'App',
	setup() {
		// return () => <Suspense>
		// 	<template #default>
		// 		<Async></Async>
		// 	</template>
		// 	<template #fallback>
		// 		<h1>Loading...</h1>
		// 	</template>
		// </Suspense>
		return () => <RouterView></RouterView>;
	}
});






export default app