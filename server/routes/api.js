const router = require("koa-router")()
const todolist = require('../controllers/todolist')
// const { authToken } = require('../service/authService');

router
    //认证中间件
    // .use(authToken)
    .get("/todolist/:uid", todolist.getAll)
    .post("/todolist/:uid", todolist.add)
    .delete("/todolist/:id", todolist.del)
    .post("/todolist/:id/changeStatus", todolist.changeStatus)

module.exports = router