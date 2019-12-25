const curd = require('../db/curd');

async function getAll(ctx) {
    console.log('uid[%s] getall todo', ctx.params.uid);

    let result = await curd.getAll(ctx.params.uid)

    ctx.body = {
        data: result.rows
    }
    console.log(result.rows);

}

async function addTodo(ctx) {
    console.log('uid[%s] add todo: %s', ctx.params.uid, JSON.stringify(ctx.request.body));

    const todo = ctx.request.body
    try {
        await curd.addTodo(ctx.params.uid, todo)
        ctx.body = {
            code: 200,
        }
    } catch (error) {
        console.log(error);
    }

}

async function delTodo(ctx) {
    console.log('user[%s] del todo[%s]', ctx.request.body.uid, ctx.params.id);

    const {
        uid
    } = ctx.request.body;

    try {
        await curd.delTodo(ctx.params.id, uid);
        ctx.status = 200
    } catch (error) {
        console.log(error);
    }

}

async function changeStatus(ctx) {
    console.log('%s change %s', ctx.request.body.uid, ctx.params.id);

    const {
        status
    } = ctx.request.body;

    try {
        await curd.setStatus(ctx.params.id, status)
        ctx.status = 200
    } catch (error) {
        console.log(error);
    }
}

async function doLogin(ctx) {
    console.log('[%s:%s] want to login', ctx.request.body.name, ctx.request.body.passwd);

    const {
        name,
        passwd
    } = ctx.request.body;

    try {
        let result = await curd.getUserInfo(name);
        if (result.rows.length === 0) {
            ctx.body = {
                code: 404,
                msg: '此昵称用户未找到~'
            }
        } else if (result.rows[0].passwd !== passwd) {
            ctx.body = {
                code: 403,
                msg: '密码错误~'
            }
        } else if (result.rows[0].passwd === passwd) {
            const uid = result.rows[0].id;
            ctx.session = {
                isLogin: true,
                name,
                uid,
            };

            console.log(name, "login success,session:", ctx.session);
            ctx.body = {
                code: 200,
                data: ctx.session
            }
        }

    } catch (error) {
        console.log(error);
    }
}

async function checkLogin(ctx) {
    if (ctx.session.isLogin) {
        ctx.body = ctx.session
    } else {
        ctx.body = {
            isLogin: false
        }
    }
}

async function logout(ctx) {
    console.log('user [%s] logout ', ctx.request.body.uid);
    ctx.session = null;
    ctx.status = 200
}

async function register(ctx) {
    console.log('someone want to regsiter [%s:%s]', ctx.request.body.name, ctx.request.body.passwd);
    const {
        name,
        passwd
    } = ctx.request.body;
    try {
        const res = await curd.getUserInfo(name);
        if (res.rows.length) {
            ctx.body = {
                code: 403,
                msg: '该用户名已被使用!'
            }
            return
        }
        await curd.createUser(name, passwd);
        ctx.body = {
            code: 200,
        };

    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    getAll,
    addTodo,
    delTodo,
    changeStatus,
    doLogin,
    register,
    logout,
    checkLogin
}