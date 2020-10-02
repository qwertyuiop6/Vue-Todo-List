const Router = require("koa-router");
const router = new Router();

const api = require("./routes/api");
const authUser = require("./routes/authUser");
const { authToken } = require("./services/auth");

router
  //主页静态文件
  .get("/", async () => {
    // ctx.redirect("./index.html");
    // await send("index.html");
  })

  //用户认证路由
  .use("/auth", authUser.routes(), authUser.allowedMethods())

  //数据api路由
  .use("/api", authToken, api.routes(), api.allowedMethods());

module.exports = router;
