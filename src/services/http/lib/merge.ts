/*
判断普通数据类型 可以toString的目标
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call({}))
console.log(Object.prototype.toString.call(/./))
console.log(Object.prototype.toString.call(''))
console.log(Object.prototype.toString.call(2))
console.log(Object.prototype.toString.call(undefined))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(false))
console.log(Object.prototype.toString.call(function))
*/
const isType = (type: string) => (target: any) =>
  `[object ${type}]` === Object.prototype.toString.call(target);
const isObject = isType('Object');
const isArray = isType('Array');
/*
深度合并
*/
const merge = (...args: any[]) => {
  if (!args.length) {
    return {};
  }
  const obj = new args[0].constructor();
  const allIsObject = args.every((arg) => typeof arg === 'object');
  if (!allIsObject) {
    return obj;
  }
  const argsTypes = isObject(args[0]) ? 'Object' : 'Array';
  args.forEach((arg) => {
    // 不支持数组和对象混合
    if (argsTypes === 'Object') {
      // 全对象
      for (const key in arg) {
        const originVal = obj[key];
        const val = arg[key];
        const originIsObject = isObject(originVal) || isArray(originVal);
        obj[key] = originIsObject ? merge(originVal, val) : val;
      }
    } else {
      // 全数组
      for (let i = 0, val; (val = arg[i++]); ) {
        const idx = i - 1;
        const originVal = obj[idx];
        const originIsObject = isObject(originVal) || isArray(originVal);
        obj[idx] = originIsObject ? merge(originVal, val) : val;
      }
    }
  });
  return obj;
};
export default merge;
