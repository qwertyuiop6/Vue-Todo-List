require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("../model/user");

async function doLogin(ctx) {
  console.log(
    "[%s:%s] want to login",
    ctx.request.body.name,
    ctx.request.body.passwd
  );

  const { name, passwd } = ctx.request.body;
  let result;
  try {
    result = await users.getUserInfo(name);
  } catch (error) {
    ctx.throw(500);
  }
  if (result.rows.length === 0) {
    ctx.throw(400, "查无此人~", {
      name,
    });
  } else if (result.rows[0].passwd !== passwd) {
    ctx.throw(403, "密码错误~", {
      name,
      passwd,
    });
  } else if (result.rows[0].passwd === passwd) {
    const user = {
      name: result.rows[0].name,
      uid: result.rows[0].id,
      isLogin: true,
    };
    const accessToken = generateAccessToken(user);
    console.log(name, "login success,user info:", user);
    ctx.send("登陆成功", { data: { accessToken, ...user } });
  }
}

async function checkLogin(ctx) {
  ctx.send("accessToken在有效期", { data: ctx.state.user });
}

async function logout(ctx) {
  console.log("user [%s] logout ", ctx.state.user.uid);
  //token del
  ctx.send("退出登陆成功", {
    status: 202,
  });
}

async function register(ctx) {
  console.log(
    "someone want to regsiter [%s:%s]",
    ctx.request.body.name,
    ctx.request.body.passwd
  );
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
    await users.createUser(name, passwd);
    ctx.send("注册成功");
  } catch (error) {
    ctx.throw(500);
  }
}

//生成token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
  });
}

//验证token中间件
async function authToken(ctx, next) {
  const authHeader = ctx.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  ctx.assert(token, 401, "Token required!");

  await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        console.log(`${err}`);
        ctx.assert(err.name !== "TokenExpiredError", 401, err.message);
        ctx.throw(403, "非法accessToken");
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
