const router = require("koa-router")();
const { register, login, checkUserName } = require("../controllers/user");
const { authToken, checkToken, deleteToken } = require("../services/auth");

router
  .post("/register", register)
  .post("/login", login)
  .get("/user", checkUserName)
  .post("/logout", authToken, deleteToken)
  .get("/checkToken", authToken, checkToken);

module.exports = router;
