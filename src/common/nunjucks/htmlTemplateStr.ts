import { nunRender } from './index';

export default {
  FmMoreRead: function (url: string, ...arg: any) {
    try {
      console.log(arg);
      return nunRender(url, { models: arg });
    } catch (e) {
      return 'sdfdsf';
    }
  },
};
