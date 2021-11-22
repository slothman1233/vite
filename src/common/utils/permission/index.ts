import service from '@/services/https';
import md5 from 'blueimp-md5';
import { getCacheCheckTime, setCacheAddTime } from './utils';
/**
 * @param {string} username 用户名
 * @param {string} pwd 密码
 * @param {string} projectId 项目名称标识
 * @param {string}  mode  项目环境标识
 */
export type LoginParams = {
  pwd: string;
  username: string;
  projectId?: string;
  mode?: 'dev' | 'test' | 'pre' | 'prod';
};

// 项目名称
let projectId = window.configModel.VUE_APP_PROJECT_ID;
//环境标识
let mode = window.configModel.VUE_APP_SSO_MODE;

/**
 * 获取对应环境的链接前缀
 * @returns {string}
 */
function getTokenBasePath() {
  const BasePathAll = new Map([
    ['dev', 'http://47.113.105.208:8089'],
    ['test', 'http://47.113.105.208:8189'],
    ['pre', 'http://47.113.105.208:8087'],
    ['prod', 'http://47.113.105.208:8086'],
  ]);

  return BasePathAll.get(mode);
}

/**
 * 登录入口
 * @param {LoginParams} data
 * @returns {Promise<any>}
 */
async function login(data: LoginParams): Promise<any> {
  if (data?.projectId) projectId = data.projectId;
  if (data?.mode) mode = data.mode;

  const cache = getUserInfoCache();

  if (cache) return JSON.parse(cache);

  const token = await getTken(data).catch((e: Error) => console.error(e));
  if (!token) return;

  const userInfoData = await getmenuList(token).catch((e: Error) => console.error(e));

  //写入缓存
  setUserInfoCache(JSON.stringify(userInfoData));

  if (!userInfoData) return;

  return userInfoData || undefined;
}

/**
 * 退出登录
 * @returns {boolean} true
 */
async function logout() {
  return removeUserInfoCache();
}

/**
 * 获取token
 * @param {LoginParams} userinfo
 * @returns {Promise<string | undefined>}
 */
async function getTken(userinfo: LoginParams): Promise<string | undefined> {
  const url = `${getTokenBasePath()}/sso/cas/login`;
  //   const sures = ['B600100', 'B600102'];
  const err = ['B600101'];
  return new Promise((resolve: (value?: string) => void, reject) => {
    service
      .post<any>(
        url,
        Object.assign({}, userinfo, { pwd: md5(`${userinfo?.username}-${userinfo?.pwd}`) }),
      )
      .then((response) => {
        if (!response || err.indexOf(response.subCode) >= 0) {
          console.error('登录失败');
          resolve();
          return;
        }

        if (response.subCode === 'B600102') {
          console.error('该账号为初始登录，请前往中控台初始化！本次登录无效');
          resolve();
          return;
        }

        resolve(response.bodyMessage.token);
      })
      .catch((e) => {
        console.error(e);
        resolve();
      });
  });
}

/**
 * 获取列表
 * @param {string} token
 * @returns {any}
 */
async function getmenuList(token: string): Promise<any> {
  const url = `${getTokenBasePath()}/sso/user/getCurrentUser`;
  //   const sures = ['B600400'];
  const err = ['B600401', 'B600402'];
  return new Promise((resolve: (value?: any) => void, reject) => {
    service
      .get<any>(url, {
        params: { projectId: projectId },
        headers: { token },
      })
      .then((response) => {
        if (!response) {
          console.error('获取列表失败');
          resolve();
          return;
        }

        if (err.indexOf(response.subCode) >= 0) {
          console.error(response.message || '获取列表失败');
          resolve();
          return;
        }

        resolve(response.bodyMessage);
        return;
      })
      .catch((e) => {
        resolve(e);
      });
  });
}

/**
 * 写入用户缓存
 * @param {string} value
 */
function setUserInfoCache(value: string) {
  setCacheAddTime(`__${projectId}__user_info`, value);
}

/**
 * 获取用户缓存
 * @returns {string}
 */
function getUserInfoCache(): string | null {
  return getCacheCheckTime(`__${projectId}__user_info`);
}

/**
 * 清空缓存
 * @returns {boolean}
 */
function removeUserInfoCache() {
  localStorage.removeItem(`__${projectId}__user_info`);
  return true;
}

/**
 * 是否登录
 * @returns {boolean}
 */
function isLogin() {
  return !!getUserInfoCache();
}

export { login, getUserInfoCache, setUserInfoCache, logout, isLogin };
