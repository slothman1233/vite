<template>
  <BaseLayout>
    <template #default>
      <div class="home-layout">
        <div class="con-box">
          <Header />

          <router-view class="app-con"></router-view>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
  import Header from '@/layout/component/header.vue';
  import BaseLayout from './base.vue';
  export default {
    name: 'DefaultLayout',
    components: { Header, BaseLayout },
    setup() {
      return {};
    },
  };
</script>

<style scoped lang="less">
  .home-layout {
    height: 100%;
    display: flex;
    .con-box {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
      box-sizing: border-box;
      .app-con {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #fff;
      }
    }
  }
</style>
