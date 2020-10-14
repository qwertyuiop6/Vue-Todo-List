const chalk = require("chalk");
const log = console.log;
const fs = require("fs");
const path = require("path");
const { timestamp2str: t2s } = require("../utils/date");

const defaultLogPath = path.join(__dirname, "../logs");

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
  const size = chalk.blackBright(ctx.response.length + "-bytes");
  const showline = `User[${user}]<${username}>\n  ${chalk.blackBright(
    "-->"
  )} ${method} ${url} ${reqBody}\n ${chalk.blackBright(" <--")} ${status} ${spendtime} ${
    ctx.response.length ? size : ""
  } ${ctx.body ? "body: " + resBody : ""} `;
  log(showline);

  const logline = `${t2s(start)}: User[${uid}](${name}) REQ: -->${ctx.method} ${
    ctx.url
  } ${JSON.stringify(ctx.request.body)} <-- RES: ${ctx.status} ${
    ctx.body ? JSON.stringify(ctx.body) : ""
  } ${ms} ${ctx.headers["content-length"] + "b"}\n`;

  if (options.save) {
    save2file("todo", options.logPath ?? defaultLogPath, logline);
  }
};

function save2file(name, path, line) {
  const d = new Date();
  let filename =
    path + "/" + name + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".log";

  fs.writeFile(filename, line, { flag: "a" }, err => {
    if (err) console.log(err);
  });
}
