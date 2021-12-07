import HttpService from '../../publicommon/utils/http';
const service = new HttpService('http://localhost:2000/', {
  // msgUI: Message,
  // logout: () => power.logout(),
  // getToken: () => power.token,
  // signHeaders: sign,
  // headers: headerAdminInfo
});
export default service;
