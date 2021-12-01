/**
 * vite 为打包后的文件提供传统浏览器兼容性支持
 */

import legacy from '@vitejs/plugin-legacy';
import type { Plugin } from 'vite';

export default (): Plugin | null => {
  return legacy({
    targets: ['> 1%, last 1 version, ie >= 9'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  });
};
