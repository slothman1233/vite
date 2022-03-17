import { MOCKTABLEDATA, RANDOMDATA } from '@/services/RequestPathName';
import { tableModel } from '@/model/demo/table';
import { MockMethod } from 'vite-plugin-mock';
import { SuccessModel } from '../_util';

const tableData: tableModel[] = [
  {
    id: '1',
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    id: '2',
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    id: '3',
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    id: '4',
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
];

export default [
  {
    url: MOCKTABLEDATA,
    method: 'get',
    response: () => {
      return new SuccessModel({
        bodyMessage: tableData,
        code: 0,
        subCode: '00000000',
        message: 'mock测试数据',
      });
    },
  },
] as MockMethod[];
