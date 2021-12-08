<template>
  <div>{{ result }}</div>
  <div> <HelloWorld /></div>

  <div>
    <SvgIcon icon-class="a-bug"></SvgIcon>
    <SvgIcon icon-class="projectManage"></SvgIcon>
  </div>
</template>

<script lang="ts">
  import { getConfigModel } from '@/common/utils/libs/configmodel';
  import { myMeta } from '@/common/utils/libs/meta';
  import setupData from '@/common/utils/libs/setupData';
  import HelloWorld from 'comps/HelloWorld.vue';
  import { defineComponent, getCurrentInstance } from 'vue';

  export default defineComponent({
    name: 'ViewsHome',
    components: { HelloWorld },
    mixins: [myMeta],
    // 1、使用 head 方法
    head() {
      return {
        title: this.title,
        metas: [
          {
            name: 'description',
            content: 'description',
          },
          {
            name: 'keywords',
            content: 'keywords',
          },
          {
            property: 'og:title',
            content: 'fdfdfdf',
          },
          {
            property: 'og:description',
            content: 'ogDescription',
          },
        ],
        script: {
          src: ['/asdf/df.js'],
          js: function () {
            var a = 1;
            console.log(a);
          },
        },
      };
    },

    setup(prop) {
      const { proxy } = getCurrentInstance();
      // console.log(proxy);
      const result = '111';
      // proxy.$configModel.name

      const config = getConfigModel();

      return {
        msg: config.name,
        title: 'title & sdf33sdf',
        result,
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
