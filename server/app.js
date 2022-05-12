const Koa = require("koa");
const serve = require("koa-static");
const body = require("koa-body");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const views = require("koa-views");
const onerror = require("koa-onerror");
// const session = require('koa-session');
const path = require("path");

const {
  staticOptions,
  bodyParser,
  logPath,
  port,
  cors: corsConfig,
  koa: koaConfig,
} = require("./app.config");

const app = new Koa(koaConfig);
const router = require("./routes");
require("dotenv").config();

app
  .use(logger())
  .use(require("./middlewares/myutils")())
  .use(require("./middlewares/checkFresh")())
  .use(cors(corsConfig))
  .use(serve(path.resolve(__dirname, "../dist"), staticOptions))
  .use(serve(path.resolve(__dirname, "./uploads"), staticOptions))
  .use(body(bodyParser))
  .use(
    views(`${__dirname}/views`, {
      extension: "pug",
    })
  )
  .use(router.routes())
  .use(handleNotFound)
  .on("error", errorHandle);

process.env.NODE_ENV === "development" && onerror(app);

async function handleNotFound(ctx) {
  ctx.status = 404;
  await ctx.render("error", { title: "FBI WARNING", error: `${ctx.url} NOT FOUND` });
}

async function errorHandle(err) {
  console.log("interal error:\n", err);
  if (process.env.NODE_ENV !== "development") {
    require("./utils/save2log")(logPath, "error", err);
  }
}
const PORT = process.env.PORT || port;

app.listen(PORT, () => {
  console.log(`linsten on http://localhost:${PORT}`);
});
