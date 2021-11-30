import { reactive, ref, ToRefs, toRefs } from 'vue';
import { ResponseData } from '@/services/http';
import { UnwrapNestedRefs } from '@vue/reactivity';

type callbackType<E, F> = (data: E, res: ToRefs<F>) => any;

type axiosType<E, F> = {
  requestFun: () => Promise<E>;
  callBackFun?: callbackType<E, F>;
};

type queryDataType<E, F> = {
  [key: string]: axiosType<E, F>;
};

/**
 * setup 返回数据封装方法
 * @param { queryDataType<E | any, F | any> } queryData 异步数据处理
 *          @param { Promise<E> } requestFun 异步请求或者Promise方法
 *          @param { Function(data: E, res: ToRefs<F>) } callBackFun 异步完成后的回调 data 是 requestFun 返回的值 res 是setup当前的数据
 * @param {U} extraData 普通数据
 */
export default function setupData<E, F, T extends commonObject<any>, U extends commonObject<any>>(
  queryData: queryDataType<E | any, F | any>,
  extraData?: U,
) {
  let staticData: UnwrapNestedRefs<any>;
  const res = extraData || {};
  const requestFunAry: Promise<E>[] = [];

  for (const key in queryData) {
    const item = queryData[key];
    requestFunAry.push(item.requestFun());

    if (!res[key]) {
      res[key] = {};
    }
    staticData = reactive(res);
  }

  const initSetup = () => {
    if (requestFunAry.length) {
      return Promise.all(requestFunAry).then((result: E[] | ResponseData<any>[]) => {
        let i = 0;
        for (const key in queryData) {
          const item = queryData[key];
          let data: any = null;
          if (item.callBackFun) {
            data = item.callBackFun(result[i], staticData);
          }
          staticData[key] = data || result[i];
          i++;
        }

        return toRefs(staticData);
      });
    } else {
      return toRefs(staticData);
    }
  };
  //@ts-ignore
  if (import.meta.env.SSR) {
    return initSetup() as U & { [S in keyof T]: any };
  } else {
    initSetup();
    return toRefs(staticData) as U & { [S in keyof T]: any };
  }
}
