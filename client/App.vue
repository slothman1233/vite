<template>
  <suspense> <RouterView></RouterView> </suspense>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';

  export default defineComponent({
    name: 'AppHome',
    components: { RouterView },
  });
</script>
