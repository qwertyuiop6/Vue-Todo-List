const user = require('../model/user');

async function checkUserName(ctx) {
    const {
        name
    } = ctx.query
    let result = await user.getUserCount(name)
    let count = result.rows[0].count

    // console.log(result);

    ctx.body = {
        code: 200,
        data: {
            name,
            count
        }
    }
}

module.exports = {
    checkUserName
}