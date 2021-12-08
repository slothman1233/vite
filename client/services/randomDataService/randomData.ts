// import env from '../../config/env'
// import http from '../http'
import service from '../https';
import { RANDOMDATA } from '../RequestPathName';

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
    // setTimeout(() => {
    //   service
    //     .get<any>(RANDOMDATA)
    //     .then((response) => {
    //       resolve(response);
    //     })
    //     .catch((e: any) => {
    //       reject(e);
    //     });
    // }, 4000);
  });
