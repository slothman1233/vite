/**
 * 分页通用model
 */
export type pageModel<T> = {
  PageSize?: number;
  TotalPages?: number;
  CurrentPage?: number;
  TotalCount?: number;
  Items: T[];
};

/**
 * setup全局通用模型
 */
export type baseSetUpModel = {
  [key: string | number | symbol]: any;
};
