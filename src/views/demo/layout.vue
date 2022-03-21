<template>
  <div class="container layout_1">
    <div class="item" v-for="item in data" v-bind:key="item.key">
      <div class="left">{{ item.key }}</div>
      <div class="right">{{ item.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  export default defineComponent({
    name: 'demoLayout',
    setup() {
      const staticData = reactive({
        data: [
          {
            key: '啊打发撒旦发',
            value: '242423423423432324',
          },
          {
            key: '啊打发撒旦发',
            value: '242423423423432324',
          },
          {
            key: '啊打发撒旦发',
            value:
              '242423423423432324242423423423432324242423423423432324242423423423432324242423423423432324242423423423432324',
          },
          {
            key: '啊打发撒旦发',
            value: '242423423423432324',
          },
          {
            key: '啊打发撒旦发',
            value: '242423423423432324',
          },
        ],
      });
      const refData = toRefs(staticData);

      return {
        ...refData,
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

<style lang="less" scoped>
  .menu {
    margin: @space_2;
    text-align: right;
  }

  .pagination {
    margin: @space_2;
    text-align: right;
  }
</style>
