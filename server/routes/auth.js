const router = require("koa-router")();
const authUser = require("../services/authUser");

router
  .post("/register", authUser.register)
  .post("/login", authUser.doLogin)
  .get("/user", authUser.checkUserName)
  .post("/logout", authUser.authToken, authUser.logout)
  .get("/checkLogin", authUser.authToken, authUser.checkLogin);

module.exports = router;
