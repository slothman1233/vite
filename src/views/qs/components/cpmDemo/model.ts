import { baseSetUpModel } from '@/model/common';

/**
 * 父组件传进来的参数模型
 */
export type propType = {};

/**
 * 供父组件调用方法的模型
 */
export type refType = {};

/**
 * setUp 返回的模型
 */
export type setUpModel = refType & baseSetUpModel;