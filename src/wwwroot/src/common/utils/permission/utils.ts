export function getCacheCheckTime(key: string, expires: number = 24 * 60 * 60 * 1000) {
  let res = localStorage.getItem(key);
  if (!res) return null;
  const cache = res.split('__time__');
  const time = +cache[1];
  if (new Date().getTime() - time >= expires) {
    // 缓存24小时过期
    res = null;
    localStorage.removeItem(key);
  } else {
    res = cache[0];
  }
  return res;
}
export function setCacheAddTime(key: string, val?: unknown) {
  if (val) {
    localStorage.setItem(key, `${val}__time__${new Date().getTime()}`);
  } else {
    localStorage.removeItem(key);
  }
}
