<template>
  <div>
    <!-- <HelloWorld :msg="msg"></HelloWorld> -->
  </div>

  <div>
    <SvgIcon icon-class="a-bug"></SvgIcon>
    <SvgIcon icon-class="projectManage"></SvgIcon>
  </div>
</template>

<script lang="ts">
  // import HelloWorld from 'comps/HelloWorld.vue';
  import { defineComponent, getCurrentInstance } from 'vue';
  export default defineComponent({
    name: 'ViewsHome',
    props: {
      num: {
        // type: String,
        // default: '默认msgs',
        // require: true,
      },
    },
    setup(prop, ctx) {
      const instance = getCurrentInstance();
      return {
        msg: 'hello World',
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
