<!--
 * @Description:
 * @Version: 0.1
 * @Author: EveChee
 * @Date: 2020-05-27 10:39:10
 * @LastEditTime: 2020-06-15 10:43:46
-->
<template>
  <div class="logo-box">
    <img :src="logo" alt="logo" class="logo-img" />
    <span>{{ title }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SildBarLogo',
    // components: {},
    props: {
      logo: {
        type: String,
        require: true,
      },
      title: {
        type: String,
        require: true,
      },
    },
    setup(prop, ctx) {
      return {
        ...prop,
      };
    },
  });
</script>

<style scoped lang="less">
  .logo-box {
    display: flex-start;
    box-sizing: border-box;
    padding: 0 20px;
    color: @menuText;
    font-size: 26px;
    .logo-img {
      height: 64px;
      width: 64px;
      background: @menuBg;
      border-radius: 8px;
      margin-right: 15px;
    }
  }
</style>
