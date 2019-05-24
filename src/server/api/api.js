const curd = require('../db/curd');

async function getAll(ctx) {
    console.log('uid[%s] getall todo', ctx.params.uid);

    let result = await curd.getAll(ctx.params.uid)
    // console.log(result.rows)

    ctx.body = {
        // code: 200,
        data: result.rows
    }
}
async function addTodo(ctx) {
    console.log('uid[%s] add todo: %s', ctx.params.uid, ctx.request.body);

    const todo = ctx.request.body
    try {
        let result = await curd.addTodo(ctx.params.uid, todo)
        ctx.body = {
            code: 200,
        }
    } catch (error) {
        console.log(error);
    }

}
async function delTodo(ctx) {
    console.log('user[%s] del todo[%s]', ctx.request.body.uid, ctx.params.todoId);

    const {
        uid
    } = ctx.request.body;
    try {
        let result = await curd.delTodo(ctx.params.todoId, uid);
        ctx.body = {
            code: 200,
        };
    } catch (error) {
        console.log(error);
    }

}
async function changeStatus(ctx) {
    console.log('change' + ctx.request.body);

    const {
        status
    } = ctx.request.body;
    try {
        let result = await curd.setStatus(ctx.params.todoId, status)
        // console.log(result.rows);
        ctx.body = {
            code: 200,
            // data:
        };
    } catch (error) {
        console.log(error);
    }
}
async function checkLogin(ctx) {
    console.log('login' + ctx.request.body);

    const {
        name,
        passwd
    } = ctx.request.body;
    try {
        let result = await curd.getUserInfo(name);
        if (result.rows.length == 0) {
            // ctx.status = 404;
            ctx.body = {
                code: 404,
                msg: '该昵称用户未找到~'
            }
        } else if (result.rows[0].u_passwd !== passwd) {
            // ctx.status = 403;
            ctx.body = {
                code: 403,
                msg: '密码不匹配~'
            }
        } else if (result.rows[0].u_passwd === passwd) {
            const uid = result.rows[0].uid;
            ctx.session = {
                name,
                isLogin: true,
                uid,
            };

            ctx.cookies.set('name', name, {
                httpOnly: false
            });
            ctx.cookies.set('isLogin', true, {
                httpOnly: false
            });
            ctx.cookies.set('uid', uid, {
                httpOnly: false
            })

            console.log(name, "login success,session:", ctx.session);

            ctx.body = {
                code: 200,
                // session: ctx.session,
            }
        }
        // console.log(result.rows);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAll,
    addTodo,
    delTodo,
    changeStatus,
    checkLogin
}