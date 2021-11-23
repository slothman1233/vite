<template>
  <el-tabs
    class="tabs-box"
    v-model="activeName"
    :closable="tabs.length > 1"
    type="card"
    @tab-click="handleClick"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="{ path, title, name } in tabs"
      :key="path"
      :label="title"
      :name="name"
      :route="path"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import { settings } from 'nprogress';
  import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  export default defineComponent({
    name: 'layoutTabs',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const staticData: { tabs: any[]; activeName: string } = reactive({
        tabs: [],
        activeName: '',
      });
      const refData = toRefs(staticData);
      // let tabs: any[] = [];
      // let activeName = '';
      watch(
        () => route.path,
        (val, oldval) => {
          setTabs(route);
        },
      );
      onMounted(() => {
        setTabs(route);
      });

      const setTabs = (route: any) => {
        const {
          fullPath,
          name,
          meta: { title },
        } = route;
        const endPath = fullPath.split('?')[0];
        const matched = refData.tabs.value.find(({ path }) => path === endPath);
        if (!matched) {
          const obj = {
            title: title,
            path: endPath,
            name: name || title,
          };
          refData.tabs.value.push(obj);
          refData.activeName.value = obj.name;
        } else {
          refData.activeName.value = matched.name;
        }
      };

      const handleClick = (tab: any) => {
        const { fullPath } = route;
        const path = tab.$attrs.route;
        if (fullPath === path) {
          return;
        }
        router.push(path);
      };

      const handleRemove = (name: string) => {
        // 如果关闭的是当前页
        const index = refData.tabs.value.findIndex((tab) => tab.name === name);
        if (name === refData.activeName.value) {
          const nextTab = refData.tabs.value[index + 1] || refData.tabs.value[index - 1];
          if (nextTab) {
            router.push(nextTab.path).catch((e) => console.log(e));
          }
        }
        refData.tabs.value.splice(index, 1);
      };

      return {
        ...refData,
        handleRemove,
        handleClick,
      };
    },
  });

  // //   import { defineComponent } from '@vue/runtime-core';
  // //   import { Component, Vue, Watch } from 'vue-property-decorator';
  // @Component
  // export default class Tabs extends Vue {
  //   activeName = '';

  //   tabs = [];

  //   // 监听路由
  //   @Watch('$route')
  //   checkRoute(nval) {
  //     this.setTabs(nval);
  //   }

  //   // 第一次生成
  //   created() {
  //     this.setTabs(this.$route);
  //   }

  //   setTabs(route) {
  //     const {
  //       fullPath,
  //       name,
  //       meta: { title },
  //     } = route;
  //     const endPath = fullPath.split('?')[0];
  //     const matched = this.tabs.find(({ path }) => path === endPath);
  //     if (!matched) {
  //       const obj = {
  //         title: title,
  //         path: endPath,
  //         name: name || title,
  //       };
  //       this.tabs.push(obj);
  //       this.activeName = obj.name;
  //     } else {
  //       this.activeName = matched.name;
  //     }
  //   }

  //   handleClick(tab) {
  //     const { fullPath } = this.$route;
  //     const path = tab.$attrs.route;
  //     if (fullPath === path) {
  //       return;
  //     }
  //     this.$router.push(path);
  //   }

  //   handleRemove(name) {
  //     // 如果关闭的是当前页
  //     const index = this.tabs.findIndex((tab) => tab.name === name);
  //     if (name === this.activeName) {
  //       const nextTab = this.tabs[index + 1] || this.tabs[index - 1];
  //       if (nextTab) {
  //         this.$router.push(nextTab.path).catch((e) => console.log(e));
  //       }
  //     }
  //     this.tabs.splice(index, 1);
  //   }
  // }
</script>

<style lang="less" scoped>
  .tabs-box {
    flex: 1;
  }
</style>
