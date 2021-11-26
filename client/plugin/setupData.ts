import { ref, inject } from 'vue';
import { AxiosRequestConfig } from 'axios';

/**
 * setup 返回数据封装方法
 * @param queryData axios 异步数据 {[变量名]: axios请求参数}
 * @param extraData 非 axios 数据
 */
export default function setupData<
  T extends commonObject<AxiosRequestConfig>,
  U extends commonObject<any>,
>(queryData: T, extraData?: U) {
  const res = extraData || ({} as U);
  const p: any = [];
  const $axios = inject<Function>('myAxios');
  for (const key in queryData) {
    if (queryData.hasOwnProperty(key)) {
      if ($axios) {
        p.push($axios(queryData[key]));
      }

      if (res[key]) {
        // @ts-ignore
        res[key] = ref(res[key]);
      } else {
        // @ts-ignore
        res[key] = ref({});
      }
    }
  }

  const initSetup = () => {
    if (p.length) {
      return Promise.all(p).then((result: any[]) => {
        let i = 0;
        for (const key in queryData) {
          if (queryData.hasOwnProperty(key)) {
            res[key].value = result[i];
            i++;
          }
        }
        return res;
      });
    } else {
      return res;
    }
  };

  if (import.meta.env.SSR) {
    return initSetup() as U & { [S in keyof T]: any };
  } else {
    initSetup();
    return res as U & { [S in keyof T]: any };
  }
}
