<template>
  <div class="side-bar" :class="{ collapse }">
    <el-menu
      class="sidebar-menu"
      :default-active="activeName"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse="collapse"
      :collapse-transition="false"
      mode="vertical"
      router
    >
      <SideBarItem v-for="(nav, i) in navData" :key="i" :item="nav" />
    </el-menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, reactive, toRefs, watch } from 'vue';
  import SideBarItem from '@/layout/component/SildeBar/SideBarItem.vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'LayoutSildBar',
    components: { SideBarItem },
    props: {
      collapse: {
        type: Boolean,
        require: true,
      },
      routes: {
        type: Array,
        require: true,
      },
    },
    setup(prop, ctx) {
      const route = useRoute();
      const variables = {
        menuBg: '#304156',
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF',
      };
      const instance = getCurrentInstance();

      const staticData: { activeName: string } = reactive({
        activeName: '',
      });
      const refData = toRefs(staticData);

      watch(
        () => route.path,
        (val, oldval) => {
          activeMenu();
          // setTabs(route);
        },
      );

      let that = instance?.appContext.config.globalProperties;

      // eslint-disable-next-line no-undef
      const parseRouteForBar = (r: Array<AppRouteRecordRaw>, basePath = '/') => {
        const nav: Array<NavData> = [];

        r.forEach(({ meta, path, children }) => {
          const mpath = pathResolve(basePath, path);

          if (meta && (meta?.inTheBar || (children && children.length))) {
            let obj: NavData = {
              subName: meta.title as string,
              path: mpath,
              icon: meta.icon,
            };

            if (children && children?.length > 1) {
              obj.children = children.map((child) => ({
                subName: child.meta?.title as string,
                path: pathResolve(obj.path || '/', child.path),
                icon: child.meta?.icon,
              }));
            } else if (children?.length) {
              const child = children[0];
              obj = {
                subName: child.meta?.title as string,
                path: pathResolve(obj.path || '/', child.path),
                icon: child.meta?.icon,
              };
            }
            nav.push(obj);
          }
        });
        return nav.filter(({ subName }) => !!subName);
      };

      const pathResolve = (basePath: string, path: string) => {
        if (basePath === '/') {
          return path.indexOf('/') !== 0 ? basePath + path : path;
        }
        return basePath + '/' + path;
      };

      const navData = (): Array<any> => {
        const routers: Array<any> = prop?.routes as Array<any>;
        return parseRouteForBar(routers);
      };

      const activeMenu = () => {
        staticData.activeName = that?.$route?.fullPath.split('?')[0];
      };
      activeMenu();

      return {
        ...refData,
        navData: navData(),
        variables,
      };
    },
  });
  interface NavData {
    // 应用名
    // appName?: string
    // 导航标题
    subName: string;
    // 复合子项
    childrens?: Array<NavChildrenData>;
    // 子项
    children?: Array<NavData>;
    // 路由
    path?: string;
    // 图标
    icon?: string;
  }
  interface NavChildrenData {
    // 具体子项
    children?: Array<NavData>;
    // 分组标题
    title?: string;
    // 路由
    path?: string;
  }
</script>

<style scoped lang="less">
  .side-bar {
    height: 100%;
    background: @menuBg;
    padding: 20px 0;
    box-sizing: border-box;
    width: 210px;
    transition: width 0.28s;
    &.collapse {
      width: auto !important;
    }
    .sidebar-menu {
      height: 100%;
      border: none;
    }
  }
</style>
