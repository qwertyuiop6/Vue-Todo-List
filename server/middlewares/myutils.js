const config = require("../app.config");

function send(msg, { data = {}, status = 200, ...rest } = {}) {
  this.status = status;
  if (!this.body) this.body = {};
  Object.assign(this.body, { code: status, msg, data, ...rest });
  return this;
}

module.exports = () => async (ctx, next) => {
  ctx.send = send; //挂载方法
  ctx.app.config = config; //挂载全局配置
  ctx.state.token = ctx.headers["authorization"]?.split(" ")[1];
  await next();
};
