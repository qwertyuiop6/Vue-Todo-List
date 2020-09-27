const router = require("koa-router");
const todo = require("../controllers/todo");
const mylogger = require("../middlewares/mylogger");

const TodoList = new router();
const Todo = new router();

Todo.get("/", todo.getAll)
  .post("/", todo.add)
  .delete("/:id", todo.del)
  .post("/:id/changeStatus", todo.changeStatus);

TodoList.use("/todolist", mylogger(), Todo.routes());

module.exports = TodoList;
