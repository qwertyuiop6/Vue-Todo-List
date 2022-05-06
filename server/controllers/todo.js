// const todos = require("../models/todo");

const { PrismaClient } = require("@prisma/client");
const { todo_list } = new PrismaClient();

async function get(ctx) {
  const { uid } = ctx.state.user;
  // let { id } = ctx.params;
  // let result = await todos.get(uid, id);

  const data = await todo_list.findMany({ where: { uid } });
  ctx.send("获取todo列表成功", { data });
}

async function add(ctx) {
  const { body: todo } = ctx.request;
  // await todos.add(ctx.state.user.uid, todo);
  await todo_list.create({
    data: {
      content: todo.target,
      start_date: todo.startDate,
      end_date: todo.endDate,
      status: +todo.status,
      user: { connect: { id: ctx.state.user.uid } },
    },
  });
  ctx.status = 201;
}

async function del(ctx) {
  const { uid } = ctx.state.user;
  const { id } = ctx.params;
  // await todos.del(id, uid);
  const todo = await todo_list.findUnique({ where: { id: +id } });
  if (todo.uid !== uid) {
    return (ctx.status = 403);
  }

  await todo_list.delete({ where: { id: +id } });

  ctx.status = 204;
}

async function update(ctx) {
  const { uid } = ctx.state.user;
  const { id } = ctx.params;
  const data = ctx.request.body;
  if (data.status) data.status = +data.status;

  const todo = await todo_list.findUnique({ where: { id: +id } });
  if (todo.uid !== uid) {
    return (ctx.status = 403);
  }
  // await todos.update(id, data);
  await todo_list.update({ where: { id: +id }, data: data });
  ctx.status = 200;
}

module.exports = {
  get,
  add,
  del,
  update,
};
