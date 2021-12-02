import { IStringifyOptions, stringify } from 'qs';
export const FILENAME = Symbol('__filename__');
// 参数转换
export default class QueryParse {
  public static queryMap: Map<string, (data: any, options?: IStringifyOptions) => any> = new Map([
    ['formd', QueryParse.createFormData],
    ['json', QueryParse.createJSON],
    ['forms', QueryParse.createFORMS],
  ]);

  private static createFormData(data: any): any {
    const form = new FormData();
    const append = FormData.prototype.append;
    let filename = '';
    if (data[FILENAME]) {
      filename = data[FILENAME];
    }
    for (const key in data) {
      const val = data[key];
      const isStream = val instanceof Blob || val instanceof File;
      if (Array.isArray(val)) {
        val.forEach((item) => {
          const params: any = [`${key}[]`, item];
          isStream && params.push(filename);
          append.apply(form, params);
        });
      } else {
        const params: any = [key, val];
        isStream && params.push(filename);
        append.apply(form, params);
      }
    }
    return form;
  }

  private static createJSON(data: any): string {
    /*
          axios 未解决的 数组变键值对BUG 起因是 util.deepMerge函数错误
          issue: https://github.com/axios/axios/issues/2813
          这里的string在传输时会被解析成json对象
          */
    return JSON.stringify(data);
  }

  private static createFORMS(data: any, options?: IStringifyOptions): string {
    // 兼容json数组 这里是formdata的字符串 一般情况用不到做个兼容
    return stringify(data, options);
  }
}
