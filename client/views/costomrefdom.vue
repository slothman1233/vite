<template>
  <div>
    {{ asdata }}
  </div>

  <input v-model="text" />
  {{ text }}
</template>

<script lang="ts">
  import { fetchRef, useDebouncedRef } from '@/common/utils/libs/customRef';
  import { getrandom, getrandom1 } from '@/services/randomDataService/randomData';
  import { ElMessage } from 'element-plus';
  import { defineComponent, reactive, toRefs } from 'vue';
  export default defineComponent({
    name: 'costomRef',

    setup(prop) {
      let asdata = fetchRef(getrandom);
      setTimeout(() => {
        asdata.value = getrandom1;
      }, 2000);

      //useDebouncedRef

      return {
        asdata,
        text: useDebouncedRef('hello'),
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
