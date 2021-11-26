import eslintPlugin from 'vite-plugin-eslint'; // 引入vite-plugin-vue

import type { Plugin } from 'vite';

export default (): Plugin | null => {
  return eslintPlugin({
    include: ['src/**/*.vue', 'src/**/*.tsx', 'src/**/*.jsx', 'src/**/*.js', 'src/**/*.ts'], // 检查的文件
  });
};
