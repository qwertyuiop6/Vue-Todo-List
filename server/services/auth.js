const jwt = require("jsonwebtoken");
const { REDIS_URL, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRESIN, ACCESS_TOKEN_REFRESH_TIME } =
  process.env;
const Redis = require("ioredis");
const redis = new Redis(REDIS_URL);

//验证token中间件
async function authToken(ctx, next) {
  // const authHeader = ctx.headers["authorization"];
  // const token = authHeader?.split(" ")[1];
  ctx.assert(ctx.state.token, 401, "Token required!");

  ctx.assert(
    !(await redis.lrange("blocklist", 0, await redis.llen("blocklist"))).includes(ctx.state.token),
    403,
    "token blocked"
  );

  await jwt.verify(ctx.state.token, ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      ctx.assert.notStrictEqual(err.name, "TokenExpiredError", 401);
      ctx.throw(403, "非法accessToken");
    }

    if (user.exp - Math.floor(Date.now() / 1000) < parseInt(ACCESS_TOKEN_REFRESH_TIME) * 60) {
      const { name, uid, avatar } = user;
      ctx.send("Token update", {
        accessToken: generateAccessToken({ name, uid, avatar }),
      });
      redis.lpush("blocklist", ctx.state.token);
    }

    ctx.state.user = user;
    await next();
  });
}

async function checkToken(ctx) {
  ctx.send("accessToken在有效期", { data: ctx.state.user });
}

//生成token
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRESIN,
  });
}

async function deleteToken(ctx) {
  //token add to blocklist
  redis.lpush("blocklist", ctx.state.token);

  ctx.send("退出登陆成功", {
    status: 202,
  });
}

module.exports = {
  checkToken,
  deleteToken,
  authToken,
  generateAccessToken,
};
