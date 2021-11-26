<template>
  <div>
    <template v-for="(item, index) in listData.list">
      <slot :item="item" :index="index">
        <p>{{ item }}</p>
      </slot>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import setupData from '../plugin/setupData';

  export default defineComponent({
    name: 'listData',
    props: {
      url: {
        type: String,
        default() {
          return '';
        },
      },
      params: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    setup(props: commonObject<any>) {
      return setupData({
        listData: {
          url: props.url,
          params: props.params,
        },
      });
    },
  });
</script>
