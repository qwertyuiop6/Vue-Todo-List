module.exports = () => async (ctx, next) => {
  function send(msg, { data = null, status = 200 }={}) {
    ctx.status = status;
    ctx.body = { code: status, msg };
    if (data) ctx.body.data = data;
  }
  ctx.send = send;
  await next();
};
