import { defineComponent } from 'vue';
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface App {
  count: number;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  app: App;
}
