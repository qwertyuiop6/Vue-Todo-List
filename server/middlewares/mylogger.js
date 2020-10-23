const chalk = require("chalk");
const { timestamp2str: t2s } = require("../utils/date");
const save2log=require('../utils/save2log')

module.exports = options => async (ctx, next) => {
  const start = Date.now();
  const { uid, name } = ctx.state.user;
  const user = chalk.blackBright(uid);
  const username = chalk.blueBright.bold(name);
  const url = chalk.cyanBright(`${ctx.url}`);
  const method = chalk.white.bold(ctx.method);
  const reqBody = chalk.magentaBright(JSON.stringify(ctx.request.body));

  await next();

  const ColorStatus = ["cyanBright", "greenBright", "blueBright", "yellowBright", "redBright"];
  const status = chalk[ColorStatus[Math.floor(ctx.status / 100) - 1]](ctx.status);
  const resBody = chalk.gray(JSON.stringify(ctx.body));
  const ms = Date.now() - start + "ms";
  const spendtime = chalk.blackBright(ms);
  const size = chalk.blackBright(ctx.response.length + "-b");
  const showline = `User[${user}]<${username}>\n  ${chalk.blackBright(
    "-->"
  )} ${method} ${url} ${reqBody}\n ${chalk.blackBright(" <--")} ${status} ${spendtime} ${
    ctx.response.length ? size : ""
  } ${ctx.body ? "body: " + resBody : ""} `;
  console.log(showline);
  
  if (options.save) {
    const logline = `${t2s(start)}: User[${uid}](${name}) REQ: -->${ctx.method} ${
      ctx.url
    } ${JSON.stringify(ctx.request.body)} <-- RES: ${ctx.status} ${
      ctx.body ? JSON.stringify(ctx.body) : ""
    } ${ms} ${ctx.response.length + "-bytes"}\n`;
    save2log(options.logPath ?? ctx.app.config.logPath,"todo",logline);
  }
};