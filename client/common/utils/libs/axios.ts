import service from '@/services/https';
import axios, { AxiosRequestConfig } from 'axios';
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
  return inject<Function>('myAxios');
}

export function setupAxios(app: App<Element>) {
  app.use(createAxios());
}
