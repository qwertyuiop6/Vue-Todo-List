const router = require("koa-router");
const { getUserData, updateUserData } = require("../controllers/user");

const user = new router();
user.get("/", getUserData).post("/", updateUserData);

module.exports = user;
