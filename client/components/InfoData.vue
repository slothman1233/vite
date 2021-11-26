<template>
  <div>
    <slot :info="infoData">
      <pre style="text-align: left">
        {{ infoData }}
      </pre>
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import setupData from '../plugin/setupData';

  export default defineComponent({
    name: 'infoData',
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
        infoData: {
          url: props.url,
          params: props.params,
        },
      });
    },
  });
</script>
