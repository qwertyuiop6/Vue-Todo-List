const config=require('../app.config')

module.exports = () => async (ctx, next) => {
  ctx.send = send;  //挂载方法
  ctx.app.config = config //挂载全局配置
  ctx.state.token = ctx.headers["authorization"]?.split(" ")[1];
  function send(msg, { data = {}, status = 200, ...rest } = {}) {
    ctx.status = status;
    if (!ctx.body) ctx.body = {};
    Object.assign(ctx.body, { code: status, msg, data, ...rest });
  }
  await next();
};
