/**
 *  element vant  组件注入处理
 */
import type { Plugin } from 'vite';
import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin(isBuild?: boolean): Plugin {
  return styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3);
          return `element-plus/theme-chalk/${name}.css`;
        },
        resolveComponent: (name) => {
          name = name.slice(3);
          return `element-plus/lib/components/${name}`;
        },
        // base: 'element-plus/theme-chalk/base.css',
      },
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => {
          return `vant/es/${name}/style`;
        },
      },
    ],
  });
}
