// import '@babel/polyfill'
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IStringifyOptions } from 'qs';
import Intercept from './lib/AxiosInstance';
import QueryParse, { FILENAME } from './lib/QueryParse';
import merge from './lib/merge';
export const SYMBOL_FILENAME = FILENAME;

// codes
export interface Codes {
  sures?: Array<string>;
  err?: Array<string>;
}
export type ReqBaseConfig = {
  // UI插件
  msgUI?: any;
  // 登出方法
  logout?: any;
  // 默认超时时间
  timeout?: number;
  // 凭证获取
  getToken?: any;
  // 默认请求头tokenKey
  tokenHeaderKey?: string;
  // 全局头部信息
  headers?: any;
  // 签名方法 返回头部
  signHeaders?: any;
  // 请求拦截方法
  requestSet?: any;
  // 响应拦截方法
  responseSet?: any;
  // 错误回调
  errorFn?: any;
  // 全局subCode模式 优先级小于指定在接口内的codes
  codes?: Codes;
};

interface DataOptions {
  params?: any;
  data?: any;
}

// 请求额外配置
export interface AxiosOptions extends DataOptions, AxiosRequestConfig {
  headers?: any;
  codes?: Codes;
  unErrorMsg?: boolean;
  queryType?: 'text' | 'json' | 'formd' | 'forms';
  queryOptions?: IStringifyOptions;
  msgPack?: boolean;
  oth?: AxiosRequestConfig;
  [configName: string]: any;
}

export interface ResponseData<T> {
  code: number | string;
  subCode: string;
  bodyMessage: T;
  message: string;
}

const HEADERS_MAP = new Map([
  [
    'text',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  ],
  [
    'json',
    {
      'Content-Type': 'application/json',
    },
  ],
  [
    'formd',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  ],
  [
    'forms',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  ],
]);

class HttpService {
  private axios: AxiosInstance;
  constructor(baseURL = '', options?: ReqBaseConfig) {
    this.axios = new Intercept(baseURL, options).getInterceptors();
  }

  public get<T>(url: string, options: AxiosOptions = {}): Promise<ResponseData<T> | undefined> {
    const { queryType = 'text', data, params, queryOptions } = options;
    if (queryType === 'text') {
      options.params = params || data;
    } else {
      options.paramsSerializer = (params) =>
        HttpService.queryParse(params || data, queryType, queryOptions);
    }
    const opts: AxiosOptions = merge({}, { headers: HEADERS_MAP.get(queryType) }, options);
    return this.axios.get(url, opts);
  }

  /**
   * @description: Post
   * @param {type}
   * @return: Promise<ResponseData | undefined>
   * @author: EveChee
   */
  public post<T>(
    url: string,
    data?: any,
    options: AxiosOptions = {},
  ): Promise<ResponseData<T> | undefined> {
    const { queryType = 'json', params, queryOptions } = options;
    let endData = data;
    if (queryType === 'text') {
      options.params = params || data;
    } else {
      endData = HttpService.queryParse(data, queryType, queryOptions);
      options.data = endData;
    }
    const isUpload = data[FILENAME];
    let defaultConfig: any = { headers: HEADERS_MAP.get(queryType) };
    if (isUpload) {
      defaultConfig = {};
      delete options.data;
      // 利用axios原生处理
    }
    const opts: AxiosOptions = merge({}, defaultConfig, options);
    return this.axios.post(url, isUpload ? endData : data, opts);
  }

  /**
   * @description: Put
   * @param {type}
   * @return: Promise<ResponseData | undefined>
   * @author: EveChee
   */
  public put<T>(
    url: string,
    data?: any,
    options: AxiosOptions = {},
  ): Promise<ResponseData<T> | undefined> {
    const { queryType = 'json', queryOptions } = options;
    if (queryType === 'text') {
      options.params = data;
    } else {
      options.data = HttpService.queryParse(data, queryType, queryOptions);
    }
    const opts: AxiosOptions = merge({}, { headers: HEADERS_MAP.get(queryType) }, options);
    return this.axios.put(url, options.data, opts);
  }

  /**
   * @description: Delete
   * @param {type}
   * @return: Promise<AxiosResponse<any>>
   * @author: EveChee
   */
  public delete<T>(url: string, options: AxiosOptions = {}): Promise<ResponseData<T> | undefined> {
    const { queryType = 'text', data, params, queryOptions } = options;
    options.params = data || params;
    if (queryType !== 'text') {
      options.paramsSerializer = (params) =>
        HttpService.queryParse(params, queryType, queryOptions);
    }
    const opts: AxiosOptions = merge({}, { headers: HEADERS_MAP.get(queryType) }, options);
    return this.axios.delete(url, opts);
  }

  // 参数格式转化
  public static queryParse(data: any, type?: string, options?: IStringifyOptions) {
    const fn = type && QueryParse.queryMap.get(type);
    return fn ? fn(data, options) : data;
  }
}

export default HttpService;
