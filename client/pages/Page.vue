<template>
  <info-data url="http://localhost:3000/list.json"></info-data>
  <list-data url="http://localhost:3000/list.json"></list-data>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ListData from '../components/ListData.vue';
  import InfoData from '../components/InfoData.vue';

  export default defineComponent({
    name: 'Page',
    components: { ListData, InfoData },
  });
</script>
