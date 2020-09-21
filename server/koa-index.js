const Koa = require("koa");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const router = require("./router");

// const session = require('koa-session');
// const sessionConf = require('./config/sessionConf')

const app = new Koa({
  proxy: true, //代理模式
  proxyIpHeader: "X-Real-IP", //代理x-real-ip头
  // maxIpsCount: 1, //反代数
});

// app.keys = sessionConf.appKeys;

app
  .use(require("./middlewares/myutils")())
  .use(require("./middlewares/cache")())
  .use(logger())
  .use(
    cors({
      origin: function(ctx) {
        return "*";
      },
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE", "PATCH"],
      allowHeaders: ["authorization", "Content-Type"],
      maxAge: 86400, //24-hours
    })
  )
  .use(static(`${__dirname}/../dist`))
  .use(bodyParser())
  // .use(session(sessionConf.config, app))
  // .use(myRouter.checkSession)
  .use(router.routes())
  .use((ctx) => {
    ctx.throw(404, "404 Not Found!!!");
  })
  .listen(8000, () => {
    console.log("linsten on http://127.0.0.1:8000");
  });
