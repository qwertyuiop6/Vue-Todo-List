const router = require("koa-router");
const { register, login, checkName } = require("../controllers/user");
const { authToken, checkToken, deleteToken } = require("../services/auth");

const auth = new router();

auth
  .post("/register", register)
  .post("/login", login)
  .get("/checkName", checkName)
  .post("/logout", authToken, deleteToken)
  .get("/token", authToken, checkToken);

module.exports = auth;
