// import env from '../../config/env'
// import http from '../http'
import service from '../https';
import { RANDOMDATA, RANDOMDATA1 } from '../RequestPathName';

// export const test = () =>
//     http.get({
//         url: '../../assets/json/random-data.json'
//     })

export const getrandom = () =>
  new Promise((resolve, reject) => {
    service
      .get<any>(RANDOMDATA)
      .then((response) => {
        resolve(response);
      })
      .catch((e: any) => {
        reject(e);
      });
  });

export const getrandom1 = () =>
  new Promise((resolve, reject) => {
    service
      .get<any>(RANDOMDATA1)
      .then((response) => {
        resolve(response);
      })
      .catch((e: any) => {
        reject(e);
      });
  });
