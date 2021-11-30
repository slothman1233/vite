import { Context, Next } from 'koa';
import { test_middleware, test_2 } from '../../../middleware/test';
import { Controller, get, middlewares } from '../../../common/decorator/httpMethod';
import http from '../../../common/utils/net';
import path from 'path';
import fs from 'fs-extra';
import log from '../../../middleware/log4js/log';

import workers from '../../../common/utils/work/worker_threads';
import { nunRender } from '../../../common/nunjucks';

//workers()

// import * as map from './map'
import { writeFile, EnsureFile, readFile, moveFile, copyFile } from '../../../common/utils/file';

export default class Common {
  @middlewares([test_middleware, test_2, test_2, test_middleware])
  @get('/index')
  async index(ctx: Context) {
    // const res = await http.get<any>('http://www.fx110.uk/api/test/test?type=2', { unErrorMsg: true })
    const res = 111;
    const respost = await http.post('http://localhost:3000/api/test/testpost', {
      type: '0',
      name: 'string',
      age: 0,
    });
    await ctx.render('index', {
      title: '12222313123123',
      name: '2444444444444444',
      html: '<div>3</div>',
      data: [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
        { a: 4, b: 5, c: 6 },
        { a: 4, b: 5, c: 6 },
      ],
      httpget: JSON.stringify(res),
      respost: JSON.stringify(respost),
    });
  }

  @get('/')
  async home(ctx: Context, next: Next) {
    //  const res = await http.get<any>('https://testmsrightsapi.tostar.top/api/Aggregate/AdminIndexV1', { unErrorMsg: true })
    //  console.log(22222, res)
    // workers()

    // const dd = await http.get<any>(
    //     'https://devmsentapi.tostar.top/api/Question/GetPagedList',
    //     {
    //         params: {
    //             pageIndex: 1,
    //             pageSize: 20,
    //             selType: 0,
    //             parQaId: 0,
    //             status: -1,
    //         },

    //         headers: { 'Content-Type': 'application/json' }
    //     }
    // )

    await ctx.render('index', {
      title: '111',
    });
  }

  /**
   * 获取静态页面的html代码
   * @param ctx
   */
  @get('/html')
  async html(ctx: Context, next: Next) {
    const ss = nunRender('views/index.njk', Object.assign({}, ctx.state));

    const filepath = path.resolve(__dirname, '..', 'htmldist', 'index.html');
    await EnsureFile(filepath);

    await writeFile(filepath, ss.toString());

    const htmlbuf = await readFile(filepath);

    const getHtml = htmlbuf.toString();

    if (getHtml !== '') {
      ctx.type = `.html`;
      ctx.status = 200;
      ctx.body = getHtml;
    } else {
      await next();
    }
  }
}

export const ss = function () {
  return 1;
};
