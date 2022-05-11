const Router = require("koa-router");
const todo = require("./todo");
const user = require("./user");
const authUser = require("./auth");
const { authToken } = require("../services/auth");
const mylogger = require("../middlewares/mylogger.js");

const router = new Router();
const api = new Router();

api
  .get("/", async (ctx) => {
    await ctx.render("api", { alive: true, mode: process.env.NODE_ENV });
  })

  //用户认证路由
  .use("/auth", authUser.routes(), authUser.allowedMethods())

  //权限数据路由
  .use(authToken)
  .use(mylogger({ save: true }))
  .use("/data", todo.routes(), todo.allowedMethods())
  .use("/users", user.routes(), user.allowedMethods());

router.get("/", async (ctx) => await ctx.render("index", { name: "TodoList Server" }));

router.use("/api", api.routes(), api.allowedMethods());

module.exports = router;
