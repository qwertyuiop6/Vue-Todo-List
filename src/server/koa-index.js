const Koa = require("koa");
const Static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const myRouter = require("./router");
const session = require('koa-session');
const sessionConf = require('./config/sessionConf')

const app = new Koa();


async function corsFrontDev(ctx, next) {
  const frontDevDomain = "localhost";
  if (ctx.origin.includes(frontDevDomain)) {
    ctx.set("Access-Control-Allow-Origin", "*");
  }

  await next();
}

app.keys = sessionConf.appKeys;

app
  .use(Static(`${__dirname}/../../dist`))
  .use(bodyParser())
  .use(corsFrontDev)
  .use(session(sessionConf.config, app))
  .use(myRouter.checkSession)
  .use(myRouter.routes)
  .listen(8000, () => {
    console.log("linsten on http://127.0.0.1:8000");
  });