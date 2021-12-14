import { defineComponent } from "vue";

<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    :list-type="listType"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :limit="limit"
    :multiple="multiple"
    :on-exceed="handleExceeds"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :on-progress="handleProgress"
    :file-list="fileList"
    :disabled="disabled"
  >
    <slot name="button">
      <el-button size="small" type="primary" v-if="listType == 'fileList'">上传</el-button>
      <el-icon v-else><plus /></el-icon>
    </slot>

    <template #tip>
      <slot name="tip">
        <div class="el-upload__tip"></div>
      </slot>
    </template>

    <template #file="{ file }">
      <slot name="file" :file="file"> </slot>
    </template>
  </el-upload>

  <slot name="dialog">
    <el-dialog v-model="dialogVisible" :lock-scroll="true" :center="true">
      <img :src="dialogImageUrl" alt="" style="display: block; margin: auto" />
    </el-dialog>
  </slot>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  // declare var HandleExceedType: (files: File[], fileList: any) => void;
  //(files: File[], fileList: any) => void
  export type propType = {
    //上传显示类型
    listType?: string;
    //是否多图上传
    multiple?: boolean;
    //允许上传的最大数量
    limit?: number;
    //默认文件列表
    fileList?: Array<any>;
    //是否禁用
    disabled?: boolean;
    //文件超出个数限制时的钩子
    handleExceed?: Function | ((files: any[], fileList: any) => void);
    //删除文件后的回调
    removeCallback: Function | ((files: any[], fileList: any) => void);
    //上传成功后的回调
    successCallback: Function | ((res: any, file: any, fileList: any) => void);
    //上传失败后后的回调
    errorCallback: Function | ((err: any, file: any, fileList: any) => void);
    //文件上传时的钩子
    progressCallback: Function | ((event: any, file: any, fileList: any) => void);
    //文件类型限制
    //type 文件类型
    //callback 类型不符合回调
    fileType?: {
      type: Array<any>;
      callback: (fileTpe: string) => void;
    };
    //文件大小限制 默认500kb
    // size 文件大小
    //callback 超过后的回调
    fileMaxSize: {
      size: number;
      callback: (fileSize: number) => void;
    };
  };

  /**
   * 文件上传
   * @param {String} listType 上传类型
   * @param {Array<Object>} fileList 默认显示的文件列表
   * @param {Boolean} disabled 是否禁用
   * @param {Boolean} multiple 是否是多图上传
   * @param {Number} limit 允许上传的最大数量
   * @param {Function} handleExceed 文件超出个数限制时的钩子 ((file: any[], fileList: any) => void
   * @param {Function} removeCallback 删除文件后的回调 ((file: any[], fileList: any) => void
   * @param {Function} successCallback 上传成功后的回调 ((res: any, file: any, fileList: any) => void
   * @param {Function} errorCallback 上传成功后的回调 ((err: any, file: any, fileList: any) => void
   * @param {Function} progressCallback 上传时的回调 ((event: any, file: any, fileList: any) => void
   * @param {Object} fileType 文件类型限制，type 文件类型，callback 类型不符合回调 fileTpe 文件类型
   * @param {Object} fileMaxSize 文件大小限制 默认500kb,size 文件大小,callback 超过后的回调 fileSize 文件大小
   */
  export default defineComponent({
    name: 'UploadImg',
    props: {
      listType: {
        require: false,
        default: 'fileList',
        type: String,
      },
      fileList: {
        require: false,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: [],
        type: Array,
      },
      disabled: {
        require: false,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: false,
        type: Boolean,
      },
      multiple: {
        require: false,
        default: false,
        type: Boolean,
      },
      limit: {
        require: false,
        default: 1,
        type: Number,
      },
      handleExceed: {
        require: false,
        type: Function,
      },
      removeCallback: {
        require: false,
        type: Function,
      },
      successCallback: {
        require: false,
        type: Function,
      },
      errorCallback: {
        require: false,
        type: Function,
      },
      progressCallback: {
        require: false,
        type: Function,
      },
      fileType: {
        require: false,
        default() {
          return {
            type: [],
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            callback: () => {},
          } as any;
        },
      },
      fileMaxSize: {
        require: false,
        default() {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          return { size: 50000 * 1024, callback: (fileSize: number) => {} };
        },
      },
    },

    setup(props: propType, ctx) {
      // const fileList = [
      //   {
      //     name: 'food.jpeg',
      //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      //   },
      //   {
      //     name: 'food2.jpeg',
      //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      //   },
      // ];
      const staticData = reactive({
        dialogImageUrl: '',
        dialogVisible: false,
        ...props,
      });

      const refData = toRefs(staticData);

      //上传成功后的回调
      const handleAvatarSuccess = (res: any, file: any, fileList: any) => {
        // this.imageUrl = URL.createObjectURL(file.raw)
        if (staticData.successCallback) {
          staticData.successCallback(res, file, fileList);
        } else {
          console.log(res, file, fileList);
        }
      };

      //上传前的回调
      const beforeAvatarUpload = (file: any) => {
        const filetype = props.fileType?.type || [];
        if (filetype.length > 0 && filetype.indexOf(file.type) < 0) {
          console.log('文件格式不正确');
          props.fileType?.callback && props.fileType?.callback(file.type);
          return false;
        }

        const fileMaxSize = props.fileMaxSize?.size || 50000 * 1024;
        if (fileMaxSize < file.size) {
          console.log(`文件大小不能超过${fileMaxSize / 1024}kb`);
          props.fileMaxSize?.callback && props.fileMaxSize?.callback(file.size);
          return false;
        }

        return true;
      };

      //删除后的回调
      const handleRemove = (file: any, fileList: any) => {
        if (staticData.removeCallback) {
          staticData.removeCallback(file, fileList);
        } else {
          console.log(file, fileList);
        }
      };

      //上传错误后的回调
      const handleAvatarError = (err: any, file: any, fileList: any) => {
        if (staticData.errorCallback) {
          staticData.errorCallback(err, file, fileList);
        } else {
          console.log(err, file, fileList);
        }
      };

      //上传时的回调
      const handleProgress = (event: any, file: any, fileList: any) => {
        console.log(file.percentage);
        if (staticData.progressCallback) {
          staticData.progressCallback(event, file, fileList);
        } else {
          console.log(event, file, fileList);
        }
      };

      //点击文件列表中已上传的文件时的钩子
      const handlePictureCardPreview = (file: any) => {
        staticData.dialogImageUrl = file.url;
        staticData.dialogVisible = true;
      };

      //文件超出个数限制时的钩子
      const handleExceeds = (files: File[], fileList: any) => {
        if (staticData.handleExceed) {
          staticData.handleExceed(files, fileList);
        } else {
          console.log(`最大上传数量为${staticData.limit}`);
        }
      };

      return {
        ...refData,
        handleRemove,
        handlePictureCardPreview,
        handleExceeds,
        beforeAvatarUpload,
        handleAvatarSuccess,
        handleAvatarError,
        handleProgress,
      };
    },
  });
</script>
