import type { bodyModel } from 'mock/_util';
import { tableModel } from '@/model/demo/table';
import service from '../https';
import { MOCKTABLEDATA } from '../RequestPathName';

export const tabledata = () =>
  service
    .get<bodyModel<tableModel[]>>(MOCKTABLEDATA)
    .then((response) => {
      return response;
    })
    .catch((e: any) => {
      console.log(e);
    });
