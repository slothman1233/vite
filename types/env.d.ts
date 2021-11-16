/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

declare interface ViteEnv {
  readonly VITE_PORT: number;
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_USE_MOCK: boolean;
  readonly VITE_OUTDIR: string;
  readonly VITE_PROJECT_ENV: string;
  readonly VITE_PUBLICDIR: string;
  readonly VITE_PUBLICDIR_OUT: string;
  readonly VITE_HOST: string;
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  readonly VITE_GLOB_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ViteEnv;
}
