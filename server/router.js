const Router = require("koa-router");
const router = new Router();

const api = require("./routes/api");
const auth = require("./routes/auth");
const { authToken } = require("./services/authUser");

router
  //主页静态文件
  .get("/", (ctx) => {
    ctx.redirect("./index.html");
  })

  //用户认证路由
  .use("/auth", auth.routes(), auth.allowedMethods())

  //数据api路由
  .use("/api", authToken, api.routes(), api.allowedMethods());

module.exports = router;
