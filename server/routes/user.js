const router = require("koa-router");
const { getUserData, updateUserData, updateUserAvatar } = require("../controllers/user");

const user = new router();
user.get("/:uid", getUserData).post("/", updateUserData).post("/avatar", updateUserAvatar);

module.exports = user;
