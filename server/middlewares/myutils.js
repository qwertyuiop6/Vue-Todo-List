module.exports = () => async (ctx, next) => {
  function send(msg, { data = null, status = 200 } = {}) {
    ctx.status = status;
    if (!ctx.body) ctx.body = {};
    Object.assign(ctx.body, { code: status, msg, data });
    // if (data) Object.assign(ctx.body, { data });
  }
  ctx.send = send;
  ctx.state.token = ctx.headers["authorization"]?.split(" ")[1];
  await next();
};
