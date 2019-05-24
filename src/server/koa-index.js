const Koa = require("koa");
const Static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const session = require('koa-session');
const myRouter = require("./router");

const app = new Koa();

const frontDevDomain = "localhost";

async function corsFrontDev(ctx, next) {

  if (ctx.origin.includes(frontDevDomain)) {
    ctx.set("Access-Control-Allow-Origin", "*");
  }

  await next();
}

app.keys = ['qwertyuiop'];
const CONFIG = {
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 3600 * 1000 * 24, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};

app
  .use(Static(`${__dirname}/../../dist`))
  .use(bodyParser())
  .use(corsFrontDev)
  .use(session(CONFIG, app))
  .use(myRouter.checkSession)
  .use(myRouter.routes)
  .listen(8000, () => {
    console.log("linsten on http://127.0.0.1:8000");
  });