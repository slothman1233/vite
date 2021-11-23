type debounceNextFunc = (args?: Array<any>, result?: any) => void;

export class Utils {
  /**
   * 生成随机字符串
   */
  public static toAnyString() {
    const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
      const r: number = (Math.random() * 16) | 0;
      const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString();
    });
    return str;
  }

  public static isExternal(path: string) {
    return /^(https?:|mailto:|tel:)/.test(path);
  }
  /**
   * 截取URL参数
   * @param {string} url
   * @returns {Object}
   */
  public static param2Obj(url: string) {
    const search: string = url.split('?')[1];
    if (!search) {
      return {};
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}',
    );
  }

  /**
   * 防抖
   * @param {Function} func 执行函数
   * @param {number} wait 延迟时间
   * @param {boolean} immediate 是否立刻执行
   * @param {debounceNextFunc} nextFunc func 执行完后的回调 回调里面包含两个值 第一个是个数组 传过来的参数   第二个是func的返回值
   * @return {*}
   */
  public static debounce(
    func: Function,
    wait: number,
    immediate = false,
    nextFunc?: debounceNextFunc,
  ) {
    let timer: any = null,
      context: any,
      timestamp = 0,
      result: any;

    const later = function (...args: any) {
      result = func.apply(context, args);
      nextFunc && nextFunc.apply(context, [args, result]);
    };

    const immediateFunc = function (...args: any) {
      const newTimeData = +new Date();
      if (newTimeData - timestamp >= wait) {
        result = func.apply(context, args);
        nextFunc && nextFunc.apply(context, [args, result]);
      }
      timestamp = newTimeData;
    };

    return (...args: any) => {
      context = this;

      //立刻执行
      if (immediate) {
        immediateFunc();
        return;
      }

      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(later.bind(context, ...args), wait);
    };
  }
}

/**
 * 获取链接的参数
 * @param {String} name 参数名
 * @return {String} 对应参数名的值  不存在返回null
 */
export const GetQueryString = function (name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
};
