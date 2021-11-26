/**
 * vite 代理处理
 */
export default {
  // 字符串简写方式
  // '/api': 'http://localhost:9000',
  // 选项写法
  '/api': {
    target: 'http://localhost:5000', // 所要代理的目标地址
    // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`
    //（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
    rewrite: (path: string) => {
      return path.replace(/^\/api/, '');
    },
    changeOrigin: true,
  },
};
