<template>
  <div class="home-layout">
    <SildeBar :collapse="isCollapse" :routes="routes" />
    <div class="con-box">
      <HeaderNav />
      <Breadcrumb :collapse="isCollapse" @toggleSideBar="toggleSideBar" />
      <keep-alive>
        <router-view class="app-con"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
  import { getUserInfoCache } from '@/common/utils/permission';
  import { reactive, toRefs } from 'vue';
  import checkMenuList, { Menu } from '@/common/utils/permission/checkMenuList';
  import { statroutes, routes as defaultRoutes } from '@/router';
  import HeaderNav from './component/HeaderNav/index.vue';

  export default {
    name: 'DefaultLayout',
    components: { HeaderNav },
    setup() {
      const staticData = reactive({
        isCollapse: false,
        routes: [],
      });

      const refData = toRefs(staticData);

      const getUserInfo = JSON.parse(getUserInfoCache() || '');

      const menuList: Menu[] = getUserInfo.menuList;

      refData.routes.value = [
        ...(defaultRoutes || []),
        ...checkMenuList(menuList, statroutes),
      ] as never[];

      const toggleSideBar = () => {
        refData.isCollapse.value = !refData.isCollapse.value;
      };

      return {
        ...refData,
        toggleSideBar,
      };
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
