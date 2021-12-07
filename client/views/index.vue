<template>
  <div> {{ title }} </div>
  <div>{{ info }}</div>
  <div>{{ infos }}</div>

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
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ViewsHome',
    components: { HelloWorld },
    setup(prop) {
      return setupData(
        {
          info: {
            requestFun: getrandom,
            callBackFun: (data, res) => {
              return '11';
            },
          },
          infos: {
            requestFun: getrandom,
            callBackFun: (data, res) => {
              res.info = '66';
              return '22';
            },
          },
        },
        {
          title: 'setupData',
          //默认值   上面info 会替换掉这个info的值
          info: '3',
          infos: {},
        },
      );
    },
  });
</script>

<style lang="less">
  body {
    color: @FontColor_1;
    display: flex;
  }
</style>
