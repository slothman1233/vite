import HttpService from '../../publicommon/utils/http';
const service = new HttpService('', {
  // msgUI: Message,
  // logout: () => power.logout(),
  // getToken: () => power.token,
  // signHeaders: sign,
  // headers: headerAdminInfo
});
export default service;
