<!--
    
   api地址:    https://element-plus.gitee.io/zh-CN/component/table.html
   * ref  获取table元素
   * highlight-current-row 点击单行高亮
   * :data 数据模型
   * default-sort  默认排序   descending 和 order   
        * 点击排序只需要在 el-table-column 上添加 sortable 即可
        *  如果需要后端排序，需将 sortable 设置为 custom，同时在 Table 上监听 sort-change 事件， 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。
   * selection-change  勾选和取消勾选 单个触发
   * filters、filter-method 筛选
        * 在列中设置 filters 和 filter-method 属性即可开启该列的筛选， filters 是一个数组，filter-method 是一个方法，它用于决定某些数据是否显示， 会传入三个参数：value, row 和 column。
   * template #default="scope"  自定义模板
        * 
 -->

<template>
  <div class="pub_line">
    <div class="left"> <Cascader @change="handleChange" /> </div>
    <div class="right">
      <div class="pub_input">
        <!-- <el-input v-model="searchinput" placeholder="请输入搜索内容" /> -->
        <input v-model="searchinput" placeholder="请输入搜索内容" />
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
  </div>

  <el-table
    ref="multipleTableRef"
    highlight-current-row
    :data="tableData"
    :default-sort="{ prop: 'id', order: 'descending' }"
    @selection-change="handleSelectionChange"
    style="width: 100%"
  >
    <!-- 多选按钮 -->
    <el-table-column type="selection" width="55" />
    <el-table-column type="expand">
      <template #default="props">
        <p>id: {{ props.row.id }}</p>
        <p>date: {{ props.row.date }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>name: {{ props.row.name }}</p>
      </template>
    </el-table-column>

    <el-table-column
      prop="id"
      label="id"
      sortable
      :filters="[
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
      ]"
      :filter-method="filterHandler"
      width="180"
    />
    <el-table-column prop="date" label="Date" sortable width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{
          scope.row.tag
        }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click.prevent="deleteRow(scope.$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pub_line">
    <div class="left">
      <el-button class="mt-4" @click="onAddItem">添加一行</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">选中第 2 3项</el-button>
      <el-button @click="toggleSelection()">取消全部勾选</el-button>
    </div>
    <div class="right">
      <!-- 分页 -->
      <Pagination
        :total="100"
        :pageSize="10"
        @next-click="nextClick"
        @prev-click="prevClick"
        @current-change="currentChange"
        @size-change="pageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { tabledata } from '@/services/demo/table';
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { ElMessage, ElTable } from 'element-plus';
  import { tableModel } from '@/model/demo/table';
  import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
  import Pagination from './pagination.vue';
  import Cascader from './cascader.vue';
  type staticDataModel = {
    tableData: tableModel[];
  };

  export default defineComponent({
    name: 'demoTables',
    components: { Pagination, Cascader },
    setup() {
      const staticData: staticDataModel = reactive({
        tableData: [],
      });
      const refData = toRefs(staticData);
      const multipleTableRef = ref<InstanceType<typeof ElTable>>();
      const multipleSelection = ref<tableModel[]>([]);
      const searchinput = ref('');
      //获取列表数据
      tabledata().then((data) => {
        console.log(data?.bodyMessage);
        staticData.tableData = data?.bodyMessage as tableModel[];
      });

      //删除一行
      const deleteRow = (index: number) => {
        staticData.tableData.splice(index, 1);
      };

      //添加一行
      const onAddItem = () => {
        staticData.tableData.push({
          id: '1',
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home',
        });
      };

      const toggleSelection = (rows?: tableModel[]) => {
        if (rows) {
          //勾选中 rows 列表数据
          rows.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(row, true);
          });
        } else {
          //取消全选
          multipleTableRef.value!.clearSelection();
        }
      };

      // 勾选触发
      const handleSelectionChange = (val: tableModel[]) => {
        multipleSelection.value = val;
      };

      const filterTag = (value: string, row: tableModel) => {
        return row.tag === value;
      };

      //过滤方法
      const filterHandler = (
        value: string,
        row: tableModel,
        column: TableColumnCtx<tableModel>,
      ) => {
        const property = column['property'];
        return row[property] === value;
      };

      //自定义按钮的方法
      const handleEdit = (index: number, row: tableModel) => {
        console.log(index, row);
        ElMessage(index.toString() + '----------------' + JSON.stringify(row));
      };
      //自定义按钮的方法
      const handleDelete = (index: number, row: tableModel) => {
        staticData.tableData.splice(index, 1);
      };

      const pageChange = (i: any) => {
        console.log('pageChange', i);
      };

      const nextClick = (i: any) => {
        console.log('nextClick', 2, i);
      };

      const currentChange = (i: any) => {
        console.log('currentChange', i);
      };

      const prevClick = (i: any) => {
        console.log('prevClick', i);
      };

      const handleChange = (value: any) => {
        console.log(123123, value);
      };

      return {
        ...refData,
        deleteRow,
        onAddItem,
        toggleSelection,
        handleSelectionChange,
        multipleTableRef,
        filterTag,
        filterHandler,
        handleEdit,
        handleDelete,
        pageChange,
        nextClick,
        currentChange,
        prevClick,
        searchinput,
        handleChange,
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

<style lang="less" scoped>
  .menu {
    margin: @space_2;
    text-align: right;
  }

  .pagination {
    margin: @space_2;
    text-align: right;
  }
</style>
