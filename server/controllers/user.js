const users = require("../models/user");
const encrypt = require("../utils/encrypt");

const { generateAccessToken } = require("../services/auth");

async function login(ctx) {
  const { name, passwd } = ctx.request.body;

  let result = await users.get({ name });
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

  let res = await users.get({ name });
  ctx.assert(!res.rows.length, 403, "该用户名已被使用!");

  const { passwd_hash, salt } = encrypt(passwd);
  await users.createUser(name, passwd_hash, salt);
  ctx.send("注册成功");
}

async function checkName(ctx) {
  const { name } = ctx.request.query;
  let res = await users.get({ name });
  ctx.assert(!res.rows.length, 403, "该用户名已被使用!");
  ctx.status = 200;
}

async function getUserData(ctx) {
  const { uid } = ctx.query;
  // ctx.assert(ctx.state.user.uid, uid, 403);
  let result = await users.get({ uid });
  const { id, name, status, avatar } = result.rows[0];

  ctx.send("获取到用户信息", {
    data: {
      id,
      name,
      status,
      avatar: avatar ?? require("../services/randomAvatar")()
    }
  });
}

async function updateUserData(ctx) {
  const { uid } = ctx.state.user;
  const { status, avatar } = ctx.request.body;
  await users.update({ status, uid });
  ctx.status = 200;
}

async function updateUserAvatar(ctx) {
  console.log(ctx.request.body, ctx.request.files);
  ctx.status = 200;
}

module.exports = {
  login,
  register,
  checkName,
  getUserData,
  updateUserData,
  updateUserAvatar
};
