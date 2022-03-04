declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
declare module 'lodash';

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.tsx' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// interface RouteMeta {
//   auth: string[];
//   icon: string;
//   isLink?: string;
//   isAffix: boolean;
//   isHide: boolean;
//   isKeepAlive: boolean;
//   title: string;
//   index?: string | number;
//   roles?: string[];
//   noCache?: boolean;
// }

interface RouteMeta {
  title?: string;
  inTheBar?: boolean;
  icon?: string;
  permission?: string;

  auth?: string[];
  isLink?: string;
  isAffix?: boolean;
  isHide?: boolean;
  isKeepAlive?: boolean;
  index?: string | number;
  roles?: string[];
  noCache?: boolean;
}

interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  query?: Partial<Recordable> | undefined;
  redirect?: string;
}

// declare module '@vue/runtime-core' {
// 	interface ComponentCustomProperties {
// 	  $configModel: clientEnv;
// 	}
//   }
