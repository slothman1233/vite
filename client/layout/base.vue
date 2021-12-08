<template>
  <div style="display: none" ref="refBase">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Header from '@/layout/component/header.vue';
  import { getCurrentInstance, onMounted } from '@vue/runtime-core';
  import { ref } from 'vue';

  export default {
    name: 'baseLayout',
    // components: { Header },
    setup() {
      const { proxy } = getCurrentInstance();

      const routers = proxy.$router.currentRoute.value;

      const refBase = ref(null);

      onMounted(() => {
        let dom = refBase.value as HTMLElement;
        dom.style.display = 'block';
      });

      //   debugger;
      return {
        refBase,
      };
    },
  };
</script>

<style scoped lang="less"></style>
