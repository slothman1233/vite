import { RANDOMDATA1 } from '@/services/RequestPathName';
import { MockMethod } from 'vite-plugin-mock';
import { SuccessModel } from '../../publicommon/model/resModel';

const model = {
  name: '7777',
  age: 112,
};

export default [
  {
    url: RANDOMDATA1,
    method: 'get',
    response: () => {
      return new SuccessModel({
        bodyMessage: model,
        code: 0,
        subCode: '00000000',
        message: 'mock测试数据',
      });
    },
  },
] as MockMethod[];
