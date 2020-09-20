const chalk = require("chalk");
const log = console.log;
module.exports = () => async (ctx, next) => {
  const start = Date.now();
  const { uid, name } = ctx.state.user;
  const user = chalk.italic.blackBright(uid);
  const username = chalk.cyanBright.bold(name);
  const url = chalk.whiteBright.bgCyan(`${ctx.url}`);
  const method = chalk.green(ctx.method);
  await next();
  const status = chalk.white.bgBlack(ctx.status);
  const ms = chalk.blackBright(Date.now() - start + "ms");
  log(`User[${user}](${username})-->`, method, url, "-->", status, ms);
};
