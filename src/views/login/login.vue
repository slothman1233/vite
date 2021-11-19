<template>
  <div id="page-login" class="login-container">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="formRef"
      class="login-form"
      size="large"
      @keyup.enter="submitForm"
    >
      <div class="title-container">
        <h3 class="title">{{ MFE_TITLE }}</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="pwd">
        <span class="svg-container">
          <SvgIcon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="pwdref"
          v-model="loginForm.pwd"
          :type="passwordType"
          placeholder="Password"
          name="pwd"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <SvgIcon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="isloading" @click="submitForm()">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  // 定义一个组件
  import { Utils } from '@/common/utils';
  import { login } from '@/common/utils/permission';
  import { ElMessage } from 'element-plus';
  import { defineComponent, getCurrentInstance, reactive, ref, unref, nextTick, toRefs } from 'vue';
  import { getrandom } from 'services/randomDataService/randomData';
  // import { useRouter } from 'vue-router';
  const TITLE_MAP = new Map<string, string>([
    ['dev', '开发环境-'],
    ['test', '测试环境-'],
    ['pre', '预发布环境-'],
    ['prod', ''],
  ]);
  const MFE_TITLE = `${TITLE_MAP.get(window.configModel.VUE_APP_SSO_MODE)}FX110主站综合管理系统`;

  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  };

  // let passwordType = 'password';
  export default defineComponent({
    name: 'AdminLogin',
    props: {},
    components: {},
    setup(props, ctx) {
      // getrandom().then((a) => {
      //   console.log(a);
      // });

      let staticData = reactive({
        isloading: false,
        passwordType: 'password',
        loginForm: {
          username: '',
          pwd: '',
          projectId: window.configModel.VUE_APP_PROJECT_ID,
          mode: window.configModel.VUE_APP_SSO_MODE,
        },
      });
      let refData = toRefs(staticData);

      const formRef = ref();
      const pwdref = ref();
      //双向绑定

      //获取vue上面的全局变量
      const instance = getCurrentInstance();
      let that = instance?.appContext.config.globalProperties;

      //点击显示密码的按钮
      let showPwd = () => {
        if (refData.passwordType.value === 'password') {
          refData.passwordType.value = '';
        } else {
          refData.passwordType.value = 'password';
        }

        nextTick(() => {
          unref(pwdref).focus();
        });
      };

      //是否跳转
      let loginNext = async (...res: any) => {
        setTimeout(() => {
          refData.isloading.value = false;
        }, 50);

        let data = await res[1];
        if (!data) return;

        that?.$router.replace('/').catch((e: any) => console.log(e));
      };

      //登录
      let fromLogin = async () => {
        if (unref(refData.isloading)) return;
        refData.isloading.value = true;

        const form: any = unref(formRef);
        if (!form) return;

        try {
          await form.validate();
          let data = await login(refData.loginForm.value);

          if (!data) {
            ElMessage.error('登录失败');
            return;
          }

          return true;
        } catch (error) {
          return;
        }
      };

      //提交登录
      let submitForm = Utils.debounce(fromLogin, 300, true, loginNext);

      return {
        showPwd,
        submitForm,
        rules,
        MFE_TITLE,
        formRef,
        pwdref,
        ...refData,
      };
    },
  });
</script>
<style lang="less" scoped>
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  @bg: #283443;
  @light_gray: #fff;
  @cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
    :deep(.login-container) .el-input input {
      color: @cursor;
    }
  }
  /* reset element-ui css */
  :deep(.el-input) {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  :deep(.el-form-item) {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
</style>

<style lang="less" scoped>
  @bg: #2d3a4b;
  @dark_gray: #889aa4;
  @light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: @bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 450px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: @dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: @light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: @dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
