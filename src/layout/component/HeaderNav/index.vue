<template>
  <header class="header">
    <Tabs />
    <SelfInfo />
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import SelfInfo from './SelfInfo.vue';
  export default defineComponent({
    name: 'HeaderNav',
    components: { SelfInfo },
    setup() {
      return {};
    },
  });
</script>

<style scoped lang="less">
  .header {
    display: flex;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 10;
    margin-bottom: 10px;
  }
</style>
