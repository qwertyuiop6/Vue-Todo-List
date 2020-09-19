const todos = require("../model/todo");

async function getAll(ctx) {
  const { uid } = ctx.request.user;
  console.log("uid[%s] getall Todo", uid);

  let result = await todos.getAll(uid);

  ctx.body = {
    code: 200,
    data: result.rows,
  };
  // console.log(result.rows);
}

async function add(ctx) {
  console.log(
    "uid[%s] add Todo: %s",
    ctx.params.uid,
    JSON.stringify(ctx.request.body)
  );

  const { user, body: todo } = ctx.request;
  try {
    await todos.add(user.uid, todo);
    ctx.status = 201;
    ctx.body = {
      code: 201,
    };
  } catch (error) {
    console.log(error);
  }
}

async function del(ctx) {
  const { uid } = ctx.request.user;
  const { id } = ctx.params;
  console.log("user[%s] want del Todo[%s]", uid, id);

  try {
    await todos.del(id, uid);
    ctx.status = 204;
  } catch (error) {
    console.log(error);
  }
}

async function changeStatus(ctx) {
  const { status } = ctx.request.body;
  const { id: todoID } = ctx.params;
  console.log(
    "user[%s] change Todo[%s]-->[%s]",
    ctx.request.user.uid,
    todoID,
    status
  );

  try {
    await todos.setStatus(todoID, status);
    ctx.status = 200;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAll,
  add,
  del,
  changeStatus,
};
