const todos = require('../model/todo');

async function getAll(ctx) {
    console.log('uid[%s] getall Todo', ctx.params.uid);

    let result = await todos.getAll(ctx.params.uid)

    ctx.body = {
        code: 200,
        data: result.rows
    }
    // console.log(result.rows);
}

async function add(ctx) {
    console.log('uid[%s] add Todo: %s', ctx.params.uid, JSON.stringify(ctx.request.body));

    const todo = ctx.request.body
    try {
        await todos.add(ctx.params.uid, todo)
        ctx.status = 201
        ctx.body = {
            code: 201,
        }
    } catch (error) {
        console.log(error);
    }
}

async function del(ctx) {
    const {
        uid
    } = ctx.request.user;

    const {
        id
    } = ctx.params;

    console.log('user[%s] del Todo[%s]', uid, id);

    try {
        await todos.del(id, uid);
        ctx.status = 204
    } catch (error) {
        console.log(error);
    }
}

async function changeStatus(ctx) {
    const {
        uid,
        status
    } = ctx.request.body;
    console.log('user[%s] change Todo[%s]-->[%s]', uid, ctx.params.id, status);

    try {
        await todos.setStatus(ctx.params.id, status)
        ctx.status = 200
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAll,
    add,
    del,
    changeStatus,
}