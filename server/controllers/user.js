const { PrismaClient } = require("@prisma/client");
const { User } = new PrismaClient();

const encrypt = require("../utils/encrypt");
const { generateAccessToken } = require("../services/auth");
const randomAvatar = require("../services/randomAvatar");
const { uploadFile } = require("../services/cos");

async function login(ctx) {
  const { name, passwd } = ctx.request.body;

  const result = await User.findFirst({ where: { name } });

  if (!result) {
    return ctx.send("查无此人", { data: { type: "name" }, status: 400 });
  }
  if (encrypt(passwd, result.salt).passwd_hash !== result.passwd) {
    return ctx.send("密码错误", { data: { type: "password" }, status: 400 });
  }

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

  const res = await User.findUnique({ where: { name } });
  ctx.assert(!res, 400, `${name} 已被使用!`);

  const { passwd_hash, salt } = encrypt(passwd);
  await User.create({ data: { name, passwd: passwd_hash, salt } });

  ctx.send("注册成功");
}

async function checkName(ctx) {
  const { name } = ctx.request.query;
  const res = await User.findUnique({ where: { name } });
  ctx.assert(!res, 400, `${name} 已被使用!`);
  ctx.status = 200;
}

async function getUserData(ctx) {
  const { uid } = ctx.params;
  const { id, name, status, avatar } = await User.findUnique({ where: { id: +uid } });

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
  await User.update({ where: { id: uid }, data });
  ctx.status = 200;
}

async function updateUserAvatar(ctx) {
  console.log(ctx.request.files);
  const { filepath, newFilename } = ctx.request.files.avatar;
  // const filename = `${hash}${path.extname(newFilename)}`;

  const avatarURL =
    process.env.USE_COS === "true"
      ? await uploadFile(filepath, "avatar", newFilename)
      : `/avatar/${newFilename}`;

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
