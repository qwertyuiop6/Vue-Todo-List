const Router = require('koa-router');
const api = require('./api/api')

const router = new Router();
let openRoutes = ['/', '/login', '/checkLogin', '/register'];
let allowMethods = ['GET', 'POST'];

router
    .get('/', ctx => {
        ctx.redirect('./index.html')
    })
    .post('/register', api.register)
    .post('/login', api.doLogin)
    .post('/logout', api.logout)
    .get('/checkLogin', api.checkLogin)

    //数据api
    .get('/api/todolist/:uid', api.getAll)
    .post('/api/todolist/:uid', api.addTodo)
    .post('/api/todolist/del/:todoId', api.delTodo)
    .post('/api/todolist/changeStatus/:todoId', api.changeStatus)

//检查数据请求登录状态合法性
async function checkSession(ctx, next) {
    console.log('find req from %s, method: %s , target api: %s', ctx.origin, ctx.method, ctx.url);

    if (!allowMethods.includes(ctx.method)) {
        ctx.status = 405;
    }

    if (!openRoutes.includes(ctx.url)) {

        if (!ctx.session.isLogin) {
            ctx.status = 403;
            ctx.body = '你还没有登录哦~';
            return;
            // ctx.status = 301;
            // ctx.redirect("/");
        }

    }
    await next();
}

module.exports = {
    routes: router.routes(),
    checkSession: checkSession
}