const { PrismaClient } = require("@prisma/client");
const { Todo } = new PrismaClient();

async function get(ctx) {
  const { uid } = ctx.state.user;

  const data = await Todo.findMany({ where: { uid } });
  // console.log(data);
  ctx.send("获取todo列表成功", { data });
}

async function add(ctx) {
  const { content, deadlineAt, complete } = ctx.request.body;
  await Todo.create({
    data: {
      content,
      deadlineAt: !deadlineAt.length ? null : new Date(deadlineAt),
      complete,
      User: { connect: { id: ctx.state.user.uid } },
    },
  });
  ctx.status = 201;
}

async function del(ctx) {
  const { uid } = ctx.state.user;
  const { id } = ctx.params;
  const todo = await Todo.findUnique({ where: { id: +id } });
  if (todo.uid !== uid) {
    return (ctx.status = 403);
  }

  await Todo.delete({ where: { id: +id } });

  ctx.status = 204;
}

async function update(ctx) {
  const { uid } = ctx.state.user;
  const { id } = ctx.params;
  const data = ctx.request.body;

  // String.prototype.bool = function () {
  //   return /^true$/i.test(this);
  // };

  const todo = await Todo.findUnique({ where: { id: +id } });
  if (todo.uid !== uid) {
    return (ctx.status = 403);
  }
  if (data.complete) data.complete = JSON.parse(data.complete);
  await Todo.update({ where: { id: +id }, data });
  ctx.status = 200;
}

module.exports = {
  get,
  add,
  del,
  update,
};
