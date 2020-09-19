const Koa = require("koa");
const Static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const myRouter = require("./router");
const cors = require("@koa/cors");
// const session = require('koa-session');
// const sessionConf = require('./config/sessionConf')

const app = new Koa({
  proxy: true,
  proxyIpHeader: "X-Real-IP",
  // maxIpsCount: 1,
});

// async function preDo(ctx, next) {
//   const localhost = ["localhost", "127.0.0.1", "::1"];
//   const frontDevDomains = ["129.211.173.197", "todo.wtfk.world"];

//   let ip;
//   if (ctx.ip.startsWith("::ff")) {
//     ip = ctx.ip.split(":").pop();
//   } else {
//     ip = ctx.ip;
//   }
//   console.log(
//     "Find req from %s, method: %s , target: %s",
//     ip,
//     ctx.method,
//     ctx.host + ctx.path
//   );

//   if (localhost.includes(ip) || frontDevDomains.includes(ip)) {
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.set("Access-Control-Allow-Credentials", true);
//   }
//   await next();
// }

// app.keys = sessionConf.appKeys;

app
  // .use(preDo)
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
  .use(Static(`${__dirname}/../dist`))
  .use(bodyParser())
  // .use(session(sessionConf.config, app))
  // .use(myRouter.checkSession)
  .use(myRouter.routes())
  .listen(8000, () => {
    console.log("linsten on http://127.0.0.1:8000");
  });
