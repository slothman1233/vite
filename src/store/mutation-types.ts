// interface mutationTypes {
//     mutations: { [propName: string]: string; }
//     action: { [propName: string]: string; }
// }

export default {
  mutations: {
    //网络状态改变
    INCREMENT: 'INCREMENT',

    SET_TOKEN: 'SET_TOKEN',
    SET_ROLES: 'SET_ROLES',
    SET_PERMISSIONS: 'SET_PERMISSIONS',
    // ROLE_DEFAULT: 'ROLE_DEFAULT',
    SET_NAME: 'SET_NAME',
    SET_AVATAR: 'SET_AVATAR',
    SET_ROUTES: 'SET_ROUTES',
  },

  action: {
    CHANGECOUNT: 'CHANGECOUNT',

    Login: 'Login',
    GetInfo: 'GetInfo',
    LogOut: 'LogOut',
    FedLogOut: 'FedLogOut',

    // 生成路由
    GenerateRoutes: 'GenerateRoutes',
  },
};
