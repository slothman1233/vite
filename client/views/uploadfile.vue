<template>
  <UploadFile :listType="'picture-card'" :multiple="true" :limit="10">
    <template #tip>
      <div class="el-upload__tip"> jpg/png files with a size less than 500kb </div>
    </template>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <el-icon><download /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </UploadFile>

  <el-dialog v-model="dialogVisible" :lock-scroll="true" :center="true">
    <img :src="dialogImageUrl" alt="" style="display: block; margin: auto" />
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  // import UploadImg from '@/components/UploadImg/index.vue';
  export default defineComponent({
    name: 'uploadFile',

    async setup(prop) {
      const staticData = reactive({
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
      });
      const refData = toRefs(staticData);

      const handleRemove = (file: any) => {
        console.log(file);
      };
      const handlePictureCardPreview = (file: any) => {
        staticData.dialogImageUrl = file.url;
        staticData.dialogVisible = true;
      };
      const handleDownload = (file: any) => {
        console.log(file);
      };

      return {
        ...refData,
        handleRemove,
        handlePictureCardPreview,
        handleDownload,
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
