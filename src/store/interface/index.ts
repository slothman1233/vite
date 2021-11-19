import { defineComponent } from 'vue';
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

interface RouteMeta {
  auth: string[];
  icon: string;
  isLink?: string;
  isAffix: boolean;
  isHide: boolean;
  isKeepAlive: boolean;
  title: string;
  index?: string | number;
  roles?: string[];
  noCache?: boolean;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  query?: Partial<Recordable> | undefined;
  redirect?: string;
}

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
