// const users = require("../models/user");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const encrypt = require("../utils/encrypt");
const path = require("path");
const { generateAccessToken } = require("../services/auth");
const randomAvatar = require("../services/randomAvatar");
const { uploadFile } = require("../services/cos");

async function login(ctx) {
  const { name, passwd } = ctx.request.body;

  // let result = await users.get({ name });
  const result = await prisma.user.findFirst({ where: { name } });

  ctx.assert.ok(result, 400, "查无此人~", { info: { name, passwd } });
  ctx.assert.strictEqual(encrypt(passwd, result.salt).passwd_hash, result.passwd, 403, "密码错误~");

  const user = {
    name: result.name,
    uid: result.id,
    avatar: result.avatar ?? randomAvatar(),
  };
  const accessToken = generateAccessToken(user);
  ctx.send("登陆成功", { data: user, accessToken });
}

async function register(ctx) {
  const { name, passwd } = ctx.request.body;

  // let res = await users.get({ name });
  const res = await prisma.user.findMany({ where: { name } });
  ctx.assert(!res.length, 403, `${name} 已被使用!`);

  // await users.createUser(name, passwd_hash, salt);
  const { passwd_hash, salt } = encrypt(passwd);
  await prisma.user.create({ data: { name, passwd: passwd_hash, salt } });

  ctx.send("注册成功");
}

async function checkName(ctx) {
  const { name } = ctx.request.query;
  // let res = await users.get({ name });
  const res = await prisma.user.findFirst({ where: { name } });
  ctx.assert(!res, 403, `${name} 已被使用!`);
  ctx.status = 200;
}

async function getUserData(ctx) {
  const { uid } = ctx.query;
  // let result = await users.get({ uid });
  const result = await prisma.user.findUnique({ where: { id: +uid } });
  const { id, name, status, avatar } = result;

  ctx.send("获取到用户信息", {
    data: {
      uid: id,
      name,
      status,
      avatar: avatar ?? randomAvatar(),
    },
  });
}

async function updateUserData(ctx) {
  const { uid } = ctx.state.user;
  const data = ctx.request.body;
  // await users.update(uid, data);
  await prisma.user.update({ where: { id: uid }, data });
  ctx.status = 200;
}

async function updateUserAvatar(ctx) {
  console.log(ctx.request.files);
  const { hash, path: filepath, name } = ctx.request.files.avatar;
  const filename = `${hash}${path.extname(name)}`;

  const avatarURL = ctx.app.config.useCOS
    ? await uploadFile(filepath, "avatar", filename)
    : `/avatar/${filepath.split(path.sep).pop()}`;

  ctx.send("文件上传成功", { data: { avatarURL }, status: 201 });
}

module.exports = {
  login,
  register,
  checkName,
  getUserData,
  updateUserData,
  updateUserAvatar,
};
