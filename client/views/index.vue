<template>
  <div> {{ title }} </div>
  <div>{{ info }}</div>
  <div>{{ infos }}</div>
  <img src="/assets/image/logo.png" />
  <HelloWorld :msg="info"></HelloWorld>
  <div>
    <SvgIcon icon-class="a-bug"></SvgIcon>
    <SvgIcon icon-class="projectManage"></SvgIcon>
  </div>
</template>

<script lang="ts">
  import setupData from '@/common/utils/libs/setupData';
  import { getrandom } from '@/services/randomDataService/randomData';
  import HelloWorld from 'comps/HelloWorld.vue';
  import { ResponseData } from 'publicommon/utils/http';
  import { defineComponent, getCurrentInstance, onBeforeMount, onMounted } from 'vue';

  export default defineComponent({
    name: 'ViewsHome',
    components: { HelloWorld },

    // beforeRouteEnter(to, from, next) {

    //   if (to.path === '/index') {
    //     next('/home');
    //   } else {
    //     next();
    //   }
    // },
    async setup(prop) {
      // const { proxy } = getCurrentInstance();
      // const routers = proxy.$router.currentRoute.value;

      const data = (await getrandom()) as ResponseData<any>;

      return {
        title: data.bodyMessage.name,
        //默认值   上面info 会替换掉这个info的值
        info: '3',
        infos: {},
        data,
      };
    },
  });
</script>

<style lang="less">
  body {
    color: @FontColor_1;
    display: flex;
  }
</style>
