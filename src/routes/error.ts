import { Context } from 'koa';
import { test_middleware } from '../middleware/test';
import { Controller, get, middlewares } from '../common/decorator/httpMethod';

// import * as map from './map'

@Controller('/error')
export default class error {
  @middlewares([test_middleware])
  @get('/404')
  async index(ctx: Context) {
    await ctx.render('error/404');
  }

  @get('/error')
  async home(ctx: Context) {
    await ctx.render('error/error');
  }
}
