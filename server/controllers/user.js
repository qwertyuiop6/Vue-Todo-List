const users = require("../models/user");
const encrypt = require("../utils/encrypt");

const { generateAccessToken } = require("../services/auth");

async function login(ctx) {
  const { name, passwd } = ctx.request.body;

  let result = await users.getUserInfo(name);
  const data = result.rows;

  ctx.assert.ok(data.length, 400, "查无此人~");
  ctx.assert.strictEqual(
    encrypt(passwd, data[0].salt).passwd_hash,
    data[0].passwd,
    403,
    "密码错误~"
  );

  const user = {
    name: data[0].name,
    uid: data[0].id
  };
  const accessToken = generateAccessToken(user);
  ctx.send("登陆成功", { data: user, accessToken });
}

async function register(ctx) {
  const { name, passwd } = ctx.request.body;

  let res = await users.getUserInfo(name);
  ctx.assert(!res.rows.length, 403, "该用户名已被使用!");

  const { passwd_hash, salt } = encrypt(passwd);
  await users.createUser(name, passwd_hash, salt);
  ctx.send("注册成功");
}

async function checkUserName(ctx) {
  const { name } = ctx.query;
  let result = await users.getUserCount(name);
  let count = result.rows[0].count;

  ctx.send(null, {
    data: {
      name,
      count
    }
  });
}

module.exports = {
  login,
  register,
  checkUserName
};
