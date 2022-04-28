<template>
  <div>qslist</div>
  <div> 12321 </div>
  <cpmDemo></cpmDemo>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { propType } from './model';
  import cpmDemo from './components/cpmDemo/index.vue';
  export default defineComponent({
    name: 'qsList',
    components: { cpmDemo },
    setup(props: propType, ctx) {
      return {};
    },
  });
</script>

<style lang="less">
  body {
    color: @FontColor_1;
    display: flex;
  }
</style>
