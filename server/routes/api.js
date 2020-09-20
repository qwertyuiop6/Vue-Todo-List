const router = require("koa-router");
const todolist = require("../controllers/todolist");
const mylogger = require("../middlewares/mylogger");

const todoList = new router();
const todo = new router();

todo
  .get("/", todolist.getAll)
  .post("/:uid", todolist.add)
  .delete("/:id", todolist.del)
  .post("/:id/changeStatus", todolist.changeStatus);

todoList.use("/todolist", mylogger(), todo.routes());

module.exports = todoList;
