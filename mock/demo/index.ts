import { RANDOMDATA } from '@/services/RequestPathName';
import { MockMethod } from 'vite-plugin-mock';
import { SuccessModel } from '../../publicommon/model/resModel';

const model = {
  name: 'aaa',
  age: 13,
};

export default [
  {
    url: RANDOMDATA,
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
