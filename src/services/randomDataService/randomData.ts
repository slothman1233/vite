// import env from '../../config/env'
// import http from '../http'
import service from '../https';
import { RANDOMDATA } from '../RequestPathName';

// export const test = () =>
//     http.get({
//         url: '../../assets/json/random-data.json'
//     })

export const getrandom = () =>
  service
    .get<any>(RANDOMDATA)
    .then((response) => {
      return response?.bodyMessage;
    })
    .catch((e: any) => {
      console.log(e);
    });
