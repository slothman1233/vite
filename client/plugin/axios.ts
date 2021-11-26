import axios, { AxiosRequestConfig } from 'axios';
import { App } from 'vue';

export default function createAxios() {
  return {
    install(app: App) {
      // axios 封装优化
      function $axios(params: AxiosRequestConfig) {
        return axios(params)
          .then((response: any) => {
            return response.data;
          })
          .catch((error: any) => {
            return {};
          });
      }
      app.provide('myAxios', $axios);
      app.config.globalProperties.$axios = $axios;
    },
  };
}
