export default {
  '/api': {
    target: 'http://xxx.xxx.xx',
    changeOrigin: true,
    rewrite: (paths: string) => paths.replace(/^\/api/, ''),
  },
};
