const router = require("koa-router")();
const user = require("../controllers/user");
const { authToken, checkToken, logout } = require("../services/auth");

router
  .post("/register", user.register)
  .post("/login", user.login)
  .get("/user", user.checkUserName)
  .post("/logout", authToken, logout)
  .get("/checkToken", authToken, checkToken);

module.exports = router;
