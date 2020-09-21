module.exports = () => async (ctx, next) => {
  let reg = /\.(css|js|ico|jpg|png|ttf|woff)$/i;
  if (reg.test(ctx.href)) {
    ctx.set("cache-control", "max-age=6000");
  }
  await next();
};
