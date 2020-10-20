const Koa = require("koa");
const static = require("koa-static");
const body = require("koa-body");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const views = require("koa-views");
const onerror = require("koa-onerror");
// const session = require('koa-session');
const path = require("path");
const router = require("./router");
const config = require("./app.config");

const app = new Koa(config.koa);

onerror(app);

app
  .use(logger())
  .use(require("./middlewares/myutils")())
  .use(require("./middlewares/checkFresh")())
  .use(cors(config.cors))
  .use(static(path.resolve("../dist"), config.static))
  .use(body(config.bodyParser))
  .use(router.routes())
  .use(
    views(`${__dirname}/views`, {
      extension: "pug"
    })
  )
  .use(async ctx => {
    ctx.status = 404;
    await ctx.render("error", { title: "FBI WARNING", error: "404 NOT FOUND" });
  })
  .on("error", (err, ctx) => {
    process.env.NODE_ENV === "development" && console.log("interal error: ", err);
  });

app.listen(config.port, () => {
  console.log(`linsten on http://localhost:${config.port}`);
});
