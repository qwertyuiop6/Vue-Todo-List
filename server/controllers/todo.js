const todos = require("../models/todo");

async function get(ctx) {
  const { uid } = ctx.state.user;
  let { id } = ctx.params;
  let result = await todos.get(uid, id);
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
  await todos.del(id, uid);
  ctx.status = 204;
}

async function update(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.params;
  await todos.update(id, data);
  ctx.status = 200;
}

module.exports = {
  get,
  add,
  del,
  update
};