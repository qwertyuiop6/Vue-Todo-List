const Koa = require("koa");
const serve = require("koa-static");
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
  .use(serve(path.resolve("../dist"), config.static))
  .use(serve("./files"), config.static)
  .use(body(config.bodyParser))
  .use(router.routes())
  .use(
    views(`${__dirname}/views`, {
      extension: "pug"
    })
  )
  .use(handleNotFound)
  .on("error", errorHandle);

async function handleNotFound(ctx) {
  ctx.status = 404;
  await ctx.render("error", { title: "FBI WARNING", error: "404 NOT FOUND" });
}

async function errorHandle(err, ctx) {
  console.log("interal error: ", err);
  if (process.env.NODE_ENV !== "development") {
    require("./utils/save2log")(config.logPath, "error", err);
  }
}

app.listen(config.port, () => {
  console.log(`linsten on http://localhost:${config.port}`);
});
