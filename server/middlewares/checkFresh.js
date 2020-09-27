module.exports = () => async (ctx, next) => {
  // let reg = /\.(css|js|ico|jpg|png|ttf|woff)$/i;
  // if (reg.test(ctx.href)) {
  //   ctx.set("cache-control", "max-age=10 * 60");
  // }

  await next();

  //协商缓存验证
  if (ctx.fresh) {
    ctx.status = 304;
    ctx.body = null;
  }
};
