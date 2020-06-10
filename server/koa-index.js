const Koa = require("koa");
const Static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const myRouter = require("./router");
// const session = require('koa-session');
// const sessionConf = require('./config/sessionConf')

const app = new Koa();


async function preDo(ctx, next) {
  console.log(
    "find req from %s, method: %s , target: %s",
    ctx.ip,
    ctx.method,
    ctx.host + ctx.path
  )

  const frontDevDomains = ["localhost", "::1", "127.0.0.1"];
  if (process.env.NODE_ENV == 'development' && frontDevDomains.includes(ctx.ip)) {
    ctx.set("Access-Control-Allow-Origin", '*');
    ctx.set("Access-Control-Allow-Credentials", true);
  }
  await next();
}

// app.keys = sessionConf.appKeys;

app
  .use(preDo)
  .use(Static(`${__dirname}/../dist`))
  .use(bodyParser())
  // .use(session(sessionConf.config, app))
  // .use(myRouter.checkSession)
  .use(myRouter.routes())
  .listen(8000, () => {
    console.log("linsten on http://127.0.0.1:8000");
  });