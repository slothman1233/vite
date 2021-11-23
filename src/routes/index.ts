
import { Context, Next } from 'koa'
import { Controller, get } from '../common/decorator/httpMethod'


// @Controller('/')
export default class Index {
    @get('/')
    async home(ctx: Context, next: Next) {
        // ctx.redirect('back', '/index.html')

        await ctx.render('index')
    }


    @get('/index')
    async index(ctx: Context, next: Next) {
        // ctx.redirect('back', '/index.html')

        await ctx.render('index')
    }


}


export const ss = function () { return 1 }
