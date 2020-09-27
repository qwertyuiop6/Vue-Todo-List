const todos = require("../models/todo");

async function getAll(ctx) {
  const { uid } = ctx.state.user;
  let result = await todos.getAll(uid);
  ctx.send("获取todo列表成功", { data: result.rows });
}

async function add(ctx) {
  const { body: todo } = ctx.request;
  await todos.add(ctx.state.user.uid, todo);
  ctx.status = 201;
}

async function del(ctx) {
  const { uid } = ctx.state.user;
  const { id } = ctx.params;
  console.log("user[%s] want del Todo[%s]", uid, id);
  await todos.del(id, uid);
  ctx.status = 204;
}

async function changeStatus(ctx) {
  const { status } = ctx.request.body;
  const { id: todoID } = ctx.params;
  await todos.setStatus(todoID, status);
  ctx.status = 200;
}

module.exports = {
  getAll,
  add,
  del,
  changeStatus
};
