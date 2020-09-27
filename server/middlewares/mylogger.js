const chalk = require("chalk");
const log = console.log;
const fs = require("fs");
const path = require("path");
const { timestamp2str: t2s } = require("../utils/date");

const logPath = path.join(__dirname, "../logs");

module.exports = () => async (ctx, next) => {
  const start = Date.now();
  const { uid, name } = ctx.state.user;
  const user = chalk.italic.blackBright(uid);
  const username = chalk.cyanBright.bold(name);
  const url = chalk.blueBright(`${ctx.url}`);
  const method = chalk.green(ctx.method);
  await next();
  const status = chalk.white.bgBlack(ctx.status);
  const ms = Date.now() - start + "ms";
  const spendtime = chalk.blackBright(ms);
  const show = `User[${user}](${username})--> ${method} ${url} --> ${status} ${spendtime}`;
  log(show);
  const logline = `${t2s(start)}: User[${uid}](${name})-->${ctx.method} ${ctx.url} --> ${
    ctx.status
  } ${ms}\n`;
  save2file("todo", logPath, logline);
};

function save2file(name, path, line) {
  const d = new Date();
  let filename =
    path + "/" + name + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".log";

  fs.writeFile(filename, line, { flag: "a" }, err => {
    if (err) console.log(err);
  });
}
