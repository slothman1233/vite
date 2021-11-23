<template>
  <div class="bread-box">
    <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleSideBar"></i>
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="{ path, title } in breadList"
        :key="path"
        :to="path ? { path } : false"
        >{{ title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
  import { useRoute } from 'vue-router';
  //   import { Component, Watch, Prop } from 'vue-property-decorator';

  export default defineComponent({
    name: 'layoutBreadCroumd',
    props: {
      collapse: {
        type: Boolean,
        require: true,
      },
    },
    setup(prop, ctx) {
      const route = useRoute();
      const staticData: { breadList: Bread[] } = reactive({
        breadList: [],
      });
      const refData = toRefs(staticData);

      const toggleSideBar = () => {
        ctx.emit('toggleSideBar');
      };

      watch(
        () => route.path,
        (val, oldval) => {
          getBreadcrumb();
        },
      );

      onMounted(() => {
        getBreadcrumb();
      });

      const getBreadcrumb = () => {
        let breadList: Bread[] = [];
        const matched = route.matched.filter((item) => item.meta && item.meta.title);
        const first = matched[0];
        if (!(first.path === '/home' && matched.length <= 1)) {
          breadList = matched;
          breadList = matched.map((_, idx, arr) => {
            const bread: Bread = {};
            bread.title = _?.meta?.title as string;
            bread.path = Object.is(_.redirect, arr[1].path)
              ? ''
              : ((_.redirect || _.path) as string);
            return bread;
          });
        }
        refData.breadList.value = breadList;
      };

      return {
        ...refData,
        toggleSideBar,
      };
    },
  });

  //   @Component
  //   export default class Breadcrumb extends Vue {
  //     @Prop()
  //     collapse!: boolean;

  //     toggleSideBar() {
  //       this.$emit('toggleSideBar');
  //     }
  //     breadList: Bread[] = [];

  //     @Watch('$route')
  //     changeRoute() {
  //       this.getBreadcrumb();
  //     }
  //     created() {
  //       this.getBreadcrumb();
  //     }
  //     getBreadcrumb() {
  //       let breadList: Bread[] = [];
  //       const matched = (this as any).$route.matched.filter((item) => item.meta && item.meta.title);
  //       const first = matched[0];
  //       if (!(first.path === '/home' && matched.length <= 1)) {
  //         breadList = matched;
  //         breadList = matched.map((_, idx, arr) => {
  //           const bread: Bread = {};
  //           bread.title = _?.meta?.title;
  //           bread.path = Object.is(_.redirect, arr[1].path) ? '' : ((_.redirect || _.path) as string);
  //           return bread;
  //         });
  //       }
  //       this.breadList = breadList;
  //     }
  //   }
  interface Bread {
    path?: string;
    title?: string;
  }
</script>

<style scoped lang="less">
  .bread-box {
    background: #fff;
    padding-left: 20px;
    display: flex-start;
    i {
      margin-right: 10px;
      cursor: pointer;
      color: @menuText;
    }
  }
</style>
