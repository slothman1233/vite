import { defineComponent } from 'vue';
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

export interface Userinfo {
  token: string;
  name: string;
  avatar: string;
  roles: Array<string>;
  permissions: Array<string>;
}

export interface permissionListState {
  routeList: Array<any>;
  addRoutes: Array<any>;
}

export interface App {
  count: number;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  app: App;
  user: Userinfo;
}
