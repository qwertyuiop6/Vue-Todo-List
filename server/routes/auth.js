const router = require("koa-router")()
const auth = require('../service/auth')
const user = require('../api/user');

router
    .post("/register", auth.register)
    .post("/login", auth.doLogin)
    .get("/user", user.checkUserName)
    .post("/logout", auth.authToken, auth.logout)
    .get("/checkLogin", auth.authToken, auth.checkLogin)

module.exports = router