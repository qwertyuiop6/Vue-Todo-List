const Router = require('koa-router');
const api = require('./api/api')

const router = new Router();

router
    .get('/', ctx => {
        ctx.redirect('./index.html')
    })
    .post('/login', api.checkLogin)

    //数据api
    .get('/api/todolist/:uid', api.getAll)
    .post('/api/todolist/:uid', api.addTodo)
    .post('/api/todolist/del/:todoId', api.delTodo)
    .post('/api/todolist/changeStatus/:todoId', api.changeStatus)

async function checkSession(ctx, next) {
    console.log('find req, method: %s , api: %s', ctx.method, ctx.url);

    if (ctx.method !== 'GET' && ctx.method !== 'POST') {
        ctx.status = 405;
    }

    if (ctx.url !== '/' && ctx.url !== '/login') {

        if (!ctx.session || !ctx.session.isLogin) {
            // ctx.status=403;
            // ctx.body = '你还没有登录哦~';
            // return;
            ctx.status = 301;
            ctx.redirect("/");
        }

    }
    await next();
}

module.exports = {
    routes: router.routes(),
    checkSession: checkSession
}