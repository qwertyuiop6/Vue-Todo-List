const router = require("koa-router")()
const api = require('../api/todo')
const authToken = require('../service/auth').authToken;

router
    //认证中间件
    .use(authToken)
    .get("/todolist/:uid", api.getAll)
    .post("/todolist/:uid", api.add)
    .delete("/todolist/:id", api.del)
    .post("/todolist/changeStatus/:id", api.changeStatus)

module.exports = router