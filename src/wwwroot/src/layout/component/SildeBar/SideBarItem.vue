<template>
  <el-sub-menu v-if="items.childrens && items.childrens.length" :index="items.path">
    <!-- 有复合子项且复合子项不为空 -->
    <template v-slot:title>
      <el-icon>
        <component :is="items.icon"> </component>
      </el-icon>
      <span>{{ items.subName }}</span>
    </template>
    <el-menu-item-group
      v-for="navChildrenData in items.childrens"
      :key="navChildrenData.title"
      :title="navChildrenData.title"
    >
      <el-menu-item
        :index="child.path"
        v-for="child in navChildrenData.children"
        :key="child.subName"
        :route="{ path: child.path }"
        >{{ child.subName }}</el-menu-item
      >
    </el-menu-item-group>
  </el-sub-menu>

  <el-sub-menu v-else-if="items.children && items.children.length" :index="items.path">
    <!-- 有子项且子项不为空（非复合子项） -->
    <template v-slot:title>
      <el-icon>
        <component :is="items.icon"> </component>
      </el-icon>
      <span>{{ items.subName }}</span>
    </template>
    <el-menu-item
      :index="child.path"
      v-for="child in items.children"
      :key="child.subName"
      :route="{ path: child.path }"
    >
      <el-icon>
        <component :is="child.icon"> </component>
      </el-icon>
      <span>{{ child.subName }}</span>
    </el-menu-item>
  </el-sub-menu>

  <el-menu-item :index="items.path" v-else :route="{ path: items.path }">
    <!-- 没有子项 -->
    <el-icon>
      <component :is="items.icon"> </component>
    </el-icon>
    <span>{{ items.subName }}</span>
  </el-menu-item>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SildBarItem',
    props: {
      item: {
        type: Array,
        require: true,
      },
    },
    setup(prop, ctx) {
      return {
        items: prop.item as any,
      };
    },
  });
</script>

<style scoped lang="scss"></style>
