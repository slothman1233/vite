<template>
  <el-header
    class="layout-header"
    height="50"
    :style="{
      position: 'relative',
      width: '100%',
      'z-index': '2',
      padding: '0',
      'padding-right': isCollapseWidth ? '64px' : '200px',
    }"
  >
    header
  </el-header>
</template>

<script lang="ts">
  import { computed, reactive, toRefs, watch } from 'vue';
  import { useStore } from 'store/index';
  interface State {
    isCollapseWidth: boolean;
  }
  export default {
    name: 'layoutHeader',
    components: {},
    setup() {
      const store = useStore();
      const state = reactive<State>({
        isCollapseWidth: false,
      });
      // watch(
      //   () => store.state.themeConfig.isCollapse,
      //   (newProps, oldProps) => {
      //     state.isCollapseWidth = newProps;
      //   }
      // );
      return {
        // setHeaderHeight,
        ...toRefs(state),
      };
    },
  };
</script>
