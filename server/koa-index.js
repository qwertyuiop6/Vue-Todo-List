const Koa = require("koa");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const views = require("koa-views");
const onerror = require("koa-onerror");

const router = require("./router");

// const session = require('koa-session');
// const sessionConf = require('./config/sessionConf')

const app = new Koa({
  proxy: true, //代理模式
  proxyIpHeader: "X-Real-IP" //代理x-real-ip头
  // maxIpsCount: 1, //反代数
});
onerror(app);
// app.keys = sessionConf.appKeys;

const staticOptions = {
  maxage: 60 * 1000, //cache-control强缓存
  setHeaders: (res, path, stats) => {
    //设置Etag协商缓存
    res.setHeader("Etag", `W/"${stats.size}-${stats.mtime.getTime()}"`);
  }
};

app
  .use(require("./middlewares/myutils")())
  .use(require("./middlewares/checkFresh")())
  .use(logger())
  .use(
    cors({
      origin: function(ctx) {
        return "*";
      },
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE", "PATCH"],
      allowHeaders: ["authorization", "Content-Type"],
      maxAge: 86400 //24-hours
    })
  )
  .use(static(`${__dirname}/../dist`, staticOptions))
  .use(bodyParser({ enableTypes: ["json", "form", "text"] }))
  // .use(session(sessionConf.config, app))
  // .use(myRouter.checkSession)
  .use(router.routes())
  .use(
    views(`${__dirname}/views`, {
      extension: "pug"
    })
  )
  .use(async ctx => {
    // ctx.throw(404, "404 Not Found!!!");
    await ctx.render("error", { title: "FBI WARNING", error: "404 NOT FOUND" });
  })
  .on("error", (err, ctx) => {
    console.log("interal error: ", err);
  });

app.listen(8000, () => {
  console.log("linsten on http://127.0.0.1:8000");
});
