<!-- 
     分页api 地址: https://element-plus.gitee.io/zh-CN/component/pagination.html
     * page-size 每页的条数
     * size-change	pageSize 改变时触发	新每页条数
     * current-change	current-change 改变时触发	新当前页
     * prev-click	用户点击上一页按钮改变当前页时触发	新当前页
     * next-click	用户点击下一页按钮改变当前页时触发	新当前页

 -->
<template>
  <el-pagination background layout="prev, pager, next" :total="total" :page-size="15" />
</template>

<script lang="ts">
  import { Context } from 'vm';
  import { defineComponent, reactive, toRefs } from 'vue';

  type propType = {
    total?: number;
    pageSize?: number;
  };

  export default defineComponent({
    name: 'demoTables',
    total: {
      total: {
        require: false,
        default: 1000,
        type: Number,
      },
      pageSize: {
        require: false,
        default: 11,
        type: Number,
      },
    },
    setup(props: propType, ctx: Context) {
      const { attrs } = ctx;
      //   ctx.attrs.onCurrentChange;
      const staticData = reactive({
        tableData: [],
        ...props,
      });
      const refData = toRefs(staticData);

      //分页的方法触发
      // const pageChange = (i: any) => {
      //   console.log('pageChange1', i);
      // };

      // const nextClick = (i: any) => {
      //   console.log('nextClick1', 2, i);
      // };

      //  const prevClick = (i: any) => {
      //   console.log('prevClick1', i);
      // };

      // const currentChange = (i: any) => {
      //   console.log('currentChange1', i);

      // };

      return {
        // pageChange,
        // nextClick,
        // prevClick,
        // currentChange,
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
