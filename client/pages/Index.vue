<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { myMeta } from '../plugin/meta';
  import setupData from '../plugin/setupData';

  export default defineComponent({
    name: 'index',
    mixins: [myMeta],
    head() {
      return {
        title: this.title,
      };
    },
    setup() {
      return setupData(
        {
          info: {
            url: 'http://localhost:3000/list.json',
          },
        },
        {
          title: 'setupData',
        },
      );
    },
  });
</script>
