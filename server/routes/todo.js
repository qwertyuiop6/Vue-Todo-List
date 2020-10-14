const router = require("koa-router");
const todo = require("../controllers/todo");
const mylogger = require("../middlewares/mylogger");

const TodoList = new router();
const Todo = new router();

Todo.get("/:id", todo.get)
  .post("/", todo.add)
  .delete("/:id", todo.del)
  .patch("/:id", todo.update)
  .put("/:id", todo.update);

TodoList.use("/todo", mylogger({ save: true }), Todo.routes());

module.exports = TodoList;
