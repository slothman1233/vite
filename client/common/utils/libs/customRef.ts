import service from '@/services/https';
import { ErrorModel } from '../../../../publicommon/model/resModel';
import { customRef } from 'vue';

/**
 * 自定数据请求的ref   --- ssr无效
 * @param { () => Promise<any> } axios 请求方法
 */
function fetchRef(axios: () => Promise<any>) {
  let data: any;
  let axiosFun = axios;
  console.log(123);
  function getData(trigger: () => void) {
    axiosFun().then((v) => {
      data = v;
      trigger(); //告诉Vue触发界面更新
    });
  }
  return customRef((track, trigger) => {
    getData(trigger);

    return {
      get() {
        track(); //告诉Vue这个数据时需要追踪变化的
        // 注意点：
        // 不能在get中发送网络请求
        // 渲染界面 -> 调用get方法 -> 发送网络请求
        // 保存数据 -> 更新界面 -> 调用get
        const v =
          data ||
          new ErrorModel({
            bodyMessage: null,
            subCode: '00000000',
            message: '数据请求错误',
          });

        return v;
      },
      set(newValue: () => Promise<any>) {
        axiosFun = newValue;
        getData(trigger);
      },
    };
  });
}

/**
 * 自定义防抖
 * @param {any} value 值
 * @param {number} delay 延迟时间 默认200毫秒
 */
function useDebouncedRef(value: any, delay = 200) {
  let timeout: NodeJS.Timeout;
  let v: any;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        //防止在延迟情况下，进行获取值的方法
        v = newValue;
        if (timeout) {
          return;
        }
        timeout = setTimeout(() => {
          value = v;
          trigger();
          timeout = null;
        }, delay);
      },
    };
  });
}

export { fetchRef, useDebouncedRef };
