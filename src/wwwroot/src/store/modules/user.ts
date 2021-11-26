import { Module } from 'vuex';
import { Userinfo, RootStateTypes } from '../interface/index';
import mutationTypes from '../mutation-types';

const userstate: Module<Userinfo, RootStateTypes> = {
  state() {
    return {
      token: '',
      name: '',
      avatar: '',
      roles: [],
      permissions: [],
    };
  },
  mutations: {
    [mutationTypes.mutations.SET_TOKEN]: (state: Userinfo, token: string) => {
      state.token = token;
    },
    [mutationTypes.mutations.SET_NAME]: (state: Userinfo, name: string) => {
      state.name = name;
    },
    [mutationTypes.mutations.SET_AVATAR]: (state: Userinfo, avatar: string) => {
      state.avatar = avatar;
    },
    [mutationTypes.mutations.SET_ROLES]: (state: Userinfo, roles: Array<string>) => {
      state.roles = roles;
    },
    [mutationTypes.mutations.SET_PERMISSIONS]: (state: Userinfo, permissions: Array<string>) => {
      state.permissions = permissions;
    },
  },
  actions: {
    // 模拟登录
    [mutationTypes.action.Login](context, userInfo: any) {
      const { commit } = context;
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve: (value?: unknown) => void, reject) => {
        commit(mutationTypes.mutations.SET_TOKEN, 'fdsakjahkhfdjasdhlafdslkdfl');
        resolve();
        // login(username, password, code, uuid).then((res:any) => {
        //   setToken(res.token)
        //   commit('SET_TOKEN', res.token)
        //   resolve()
        // }).catch((error:any) => {
        //   reject(error)
        // })
      });
    },

    // 获取用户信息
    [mutationTypes.action.GetInfo](context) {
      const { commit } = context;
      return new Promise((resolve, reject) => {
        const res = {
          msg: '操作成功',
          code: 200,
          permissions: ['*:*:*'],
          roles: ['admin'],
          user: {
            searchValue: null,
            createBy: 'admin',
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            remark: '管理员',
            params: {},
            userId: 1,
            deptId: 103,
            userName: 'admin',
            nickName: '吉想',
            email: 'jt@qq.com',
            phonenumber: '15888888888',
            sex: '1',
            avatar: '',
            salt: null,
            status: '0',
            delFlag: '0',
            loginIp: '127.0.0.1',
            loginDate: '2018-03-16T11:33:00.000+0800',
            dept: {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              deptId: '103',
              parentId: 101,
              ancestors: null,
              deptName: '研发部门',
              orderNum: '1',
              leader: '吉想',
              phone: null,
              email: null,
              status: '0',
              delFlag: null,
              parentName: null,
              children: [],
            },
            roles: [
              {
                searchValue: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
                remark: null,
                params: {},
                roleId: 1,
                roleName: '超级管理员',
                roleKey: 'admin',
                roleSort: '1',
                dataScope: '1',
                menuCheckStrictly: false,
                deptCheckStrictly: false,
                status: '0',
                delFlag: null,
                flag: false,
                menuIds: null,
                serverRegisterId: null,
                deptIds: null,
                admin: true,
              },
            ],
            roleIds: null,
            postIds: null,
            admin: true,
          },
        };
        const users = res.user;
        // const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
        if (res.roles && res.roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          commit(mutationTypes.mutations.SET_ROLES, res.roles);
          commit(mutationTypes.mutations.SET_PERMISSIONS, res.permissions);
        } else {
          commit(mutationTypes.mutations.SET_ROLES, ['ROLE_DEFAULT']);
          // commit(user.mutations.SET_ROLES, ['ROLE_DEFAULT']);
        }
        commit(mutationTypes.mutations.SET_NAME, users.userName);
        // commit('SET_AVATAR', avatar)
        resolve(res);

        // getInfo(state.token).then(res => {
        //   const users = res.user
        //   const avatar = users.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
        //   if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', res.roles)
        //     commit('SET_PERMISSIONS', res.permissions)
        //   } else {
        //     commit('SET_ROLES', ['ROLE_DEFAULT'])
        //   }
        //   commit('SET_NAME', users.userName)
        //   commit('SET_AVATAR', avatar)
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
      });
    },

    // 退出系统
    [mutationTypes.action.LogOut](context) {
      const { commit } = context;
      return new Promise((resolve: (value?: unknown) => void, reject) => {
        commit(mutationTypes.mutations.SET_TOKEN, '');
        commit(mutationTypes.mutations.SET_ROLES, []);
        commit(mutationTypes.mutations.SET_PERMISSIONS, []);
        // removeToken()
        resolve();
        // logout().then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   commit('SET_PERMISSIONS', [])
        //   // removeToken()
        //   resolve()
        // }).catch((error:any) => {
        //   reject(error)
        // })
      });
    },
    // 前端 登出
    [mutationTypes.action.FedLogOut](context) {
      const { commit } = context;
      return new Promise((resolve: (value?: unknown) => void) => {
        commit('SET_TOKEN', '');
        // removeToken()
        resolve();
      });
    },
  },
};

export default userstate;
