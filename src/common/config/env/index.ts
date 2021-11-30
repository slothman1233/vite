/**
 * @description 配置文件入口
 * @author 文亮
 */

import dev from './dev';
import test from './test';
import pre from './pre';
import prod from './prod';

import { isTest, isPre, isGa, isDocker } from '../../utils/env';

import { env } from './env';

let config: env = dev;

if (isTest) {
  config = test;
} else if (isPre) {
  config = pre;
} else if (isGa || isDocker) {
  config = prod;
}

config.dataCahce = {};

export default config;
