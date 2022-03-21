<template>
  <el-dropdown @command="handleCommand">
    <div class="self-info">
      <el-avatar size="large" src="/assets/image/defaulthread.png"> </el-avatar>
      <el-icon>
        <ArrowDown></ArrowDown>
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logouts">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
  import { logout } from '@/common/utils/permission';
  import { defineComponent, getCurrentInstance } from 'vue';
  // import { Component } from 'vue-property-decorator';
  // import { power } from '@/router';

  export default defineComponent({
    name: 'SelfInfo',
    setup() {
      const instance = getCurrentInstance();
      let that = instance?.appContext.config.globalProperties;
      const staticFunc = {
        logouts: () => {
          logout();
          that?.$router.replace('/').catch((e: any) => console.log(e));
          location.reload();
        },
      };

      const handleCommand = (command: any) => {
        staticFunc[command]();
      };

      return {
        ...staticFunc,
        handleCommand,
      };
    },
  });
</script>

<style scoped lang="less">
  .self-info {
    display: flex-start;
    margin-left: 10px;
    cursor: pointer;
  }
  .el-icon {
    position: relative;
    top: -12px;
  }
</style>
