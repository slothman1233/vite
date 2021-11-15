<template>
  <HelloWorld :msg="msg"></HelloWorld>
</template>

<script lang="ts">
import HelloWorld from "comps/HelloWorld.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { HelloWorld },
  setup(prop) {
    return {
      msg: "hello World",
    };
  },
});
</script>