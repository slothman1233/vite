import service from '@/services/https';
import axios, { AxiosRequestConfig } from 'axios';
import HttpService from 'publicommon/utils/http';
import { App, inject } from 'vue';

export default function createAxios() {
  return {
    install(app: App) {
      app.provide('myAxios', service);
      app.config.globalProperties.$axios = service;
    },
  };
}

export function getAxios() {
  return inject<HttpService>('myAxios');
}

export function setupAxios(app: App<Element>) {
  app.use(createAxios());
}
