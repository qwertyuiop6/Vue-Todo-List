const Router = require("koa-router");

const todo = require("./routes/todo");
const user = require("./routes/user");
const authUser = require("./routes/authUser");
const { authToken } = require("./services/auth");

const router = new Router();
const api = new Router();

api
  //主页静态文件
  .get("/", async () => {
    // ctx.redirect("./index.html");
    // await send("index.html");
  })

  //用户认证路由
  .use("/auth", authUser.routes(), authUser.allowedMethods())

  //数据api路由
  .use("/data", authToken, todo.routes(), todo.allowedMethods())

  .use("/user", authToken, user.routes(), user.allowedMethods());

router.use("/api", api.routes(), api.allowedMethods());

module.exports = router;
