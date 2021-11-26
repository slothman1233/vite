<template>
  <div>
   123213213
  </div>

  <div>
    <SvgIcon icon-class="a-bug"></SvgIcon>
    <SvgIcon icon-class="projectManage"></SvgIcon>
  </div>
</template>

<script lang="ts">
  import HelloWorld from 'comps/HelloWorld.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ViewsHome',
    components: { HelloWorld },
    setup(prop) {
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
