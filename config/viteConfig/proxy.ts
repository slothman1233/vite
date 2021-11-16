<<<<<<< HEAD



export default {
    '/api':
    {
        target: 'http://xxx.xxx.xx',
        changeOrigin: true,
        rewrite:
            (paths) => paths.replace(/^\/api/, '')
    }
}
=======
export default {
  '/api': {
    target: 'http://xxx.xxx.xx',
    changeOrigin: true,
    rewrite: (paths: string) => paths.replace(/^\/api/, ''),
  },
};
>>>>>>> 3a722460e2637135c4c7ff582594176aceb6b9b1
