/**
 * Mock处理
 */
import type { Plugin } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';
import env from '../../../client/common/config/mock';

// eslint-disable-next-line no-global-assign
//window = {};
//window.configModel = env;
export default function configMockPlugin(
  useMock = true,
  isBuild: boolean,
  mode: string,
): Plugin | null {
  let viteMockServePlugin: Plugin | null = null;

  if (mode === 'mock' && useMock) {
    // console.log(path.resolve(process.cwd(), 'client/main.{ts,js}'));
    viteMockServePlugin = viteMockServe({
      ignore: /^_/, //自动读取模拟.ts 文件时，请忽略指定格式的文件
      mockPath: 'mock', //mock文件地址
      localEnabled: !isBuild, // 开发打包开关
      prodEnabled: isBuild, // 生产打包开关
      injectFile: path.resolve(process.cwd(), 'client/main.{ts,js}'),
      // 这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
      import { setupProdMockServer } from 'mock/_createProductionServer';

      setupProdMockServer();
      `,
      logger: false, //是否在控制台显示请求日志
      supportTs: false, //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
    });
  }

  // // console.log(isBuild, useMock)
  // const viteMockServePlugin: Plugin | null = useMock
  //   ? viteMockServe({
  //     ignore: /^\_/, //自动读取模拟.ts 文件时，请忽略指定格式的文件
  //     mockPath: 'mock', //mock文件地址
  //     localEnabled: !isBuild, // 开发打包开关
  //     prodEnabled: isBuild,// 生产打包开关
  //     // 这样可以控制关闭mock的时候不让mock打包到最终代码内
  //     injectCode: `
  //     import { setupProdMockServer } from 'mock/_createProductionServer';

  //     setupProdMockServer();
  //     `,
  //     logger: false, //是否在控制台显示请求日志
  //     supportTs: false //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
  //   })
  //   : null

  return viteMockServePlugin;
}
