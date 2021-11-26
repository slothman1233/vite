import eslintPlugin from 'vite-plugin-eslint'; // 引入vite-plugin-vue

import type { Plugin } from 'vite';

export default (): Plugin | null => {
  return eslintPlugin({
    include: [
      'client/**/*.vue',
      'client/**/*.tsx',
      'client/**/*.jsx',
      'client/**/*.js',
      'client/**/*.ts',
    ], // 检查的文件
  });
};
