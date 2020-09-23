let ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRESIN;
const tokenConf = require("../configs/token");
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  ({
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRESIN,
  } = process.env);
} else {
  ({
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRESIN,
  } = tokenConf); //已声明变量的对象解构赋值
}

const jwt = require("jsonwebtoken");
const users = require("../models/user");
const encrypt = require("../utils/encrypt");
const Redis = require("ioredis");

const redis = new Redis(require('../configs/redis'));

async function doLogin(ctx) {
  const { name, passwd } = ctx.request.body;
  let result;
  try {
    result = await users.getUserInfo(name);
  } catch (error) {
    ctx.throw(500);
  }
  const data = result.rows;
  ctx.assert.ok(data.length, 400, "查无此人~", {
    name,
  });

  ctx.assert.strictEqual(
    encrypt(passwd, data[0].salt).passwd_hash,
    data[0].passwd,
    403,
    "密码错误~",
    {
      name,
      passwd,
    }
  );

  const user = {
    name: data[0].name,
    uid: data[0].id,
  };
  const accessToken = generateAccessToken(user);
  ctx.send("登陆成功", { data: { accessToken, ...user } });
}

// function checkPasswd(user,passwd) {
//   let { passwd:passwd_hash, salt } = user;
//   return encrypt(passwd, salt).passwd_hash === passwd_hash;
// }

async function logout(ctx) {
  //token del
  redis.lpush("blocklist", ctx.state.token);

  ctx.send("退出登陆成功", {
    status: 202,
  });
}

async function register(ctx) {
  const { name, passwd } = ctx.request.body;
  let res;
  try {
    res = await users.getUserInfo(name);
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
  ctx.assert(!res.rows.length, 403, "该用户名已被使用!");

  try {
    const { passwd_hash, salt } = encrypt(passwd);
    await users.createUser(name, passwd_hash, salt);
    ctx.send("注册成功");
  } catch (error) {
    ctx.throw(500);
  }
}

async function checkLogin(ctx) {
  ctx.send("accessToken在有效期", { data: ctx.state.user });
}

//生成token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  });
}

//验证token中间件
async function authToken(ctx, next) {
  // const authHeader = ctx.headers["authorization"];
  // const token = authHeader?.split(" ")[1];
  ctx.assert(ctx.state.token, 401, "Token required!");

  ctx.assert(
    !(
      await redis.lrange("blocklist", 0, await redis.llen("blocklist"))
    ).includes(ctx.state.token),
    403,
    "token blocked"
  );

  await jwt.verify(
    ctx.state.token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        console.log(`${err}`);
        ctx.assert.notStrictEqual(
          err.name,
          "TokenExpiredError",
          401,
          err.message
        );
        ctx.throw(403, "非法accessToken");
      }
      // console.log(user);
      if (user.exp < Math.floor(Date.now() / 1000) + 60 * 3) {
        const { name, uid } = user;
        ctx.send("token update", {
          data: { accessToken: generateAccessToken({ name, uid }) },
        });
        redis.lpush("blocklist", ctx.state.token);
      }

      ctx.state.user = user;
      await next();
    }
  );
}

async function checkUserName(ctx) {
  const { name } = ctx.query;
  let result = await users.getUserCount(name);
  let count = result.rows[0].count;

  ctx.send("", {
    data: {
      name,
      count,
    },
  });
}

module.exports = {
  doLogin,
  checkLogin,
  register,
  logout,
  authToken,
  checkUserName,
};
