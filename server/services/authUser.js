require("dotenv").config()
const jwt = require("jsonwebtoken")
const users = require("../model/user")

async function doLogin(ctx) {
	console.log(
		"[%s:%s] want to login",
		ctx.request.body.name,
		ctx.request.body.passwd
	)

	const {
		name,
		passwd
	} = ctx.request.body

	try {
		let result = await users.getUserInfo(name)
		if (result.rows.length === 0) {
			// ctx.status = 404
			ctx.body = {
				code: 404,
				msg: "此昵称用户未找到~",
			}
		} else if (result.rows[0].passwd !== passwd) {
			// ctx.status = 403
			ctx.body = {
				code: 403,
				msg: "密码错误~",
			}
		} else if (result.rows[0].passwd === passwd) {
			const user = {
				name: result.rows[0].name,
				uid: result.rows[0].id,
				isLogin: true,
			}
			const accessToken = generateAccessToken(user)

			console.log(name, "login success,user info:", user)
			ctx.body = {
				code: 200,
				msg: "登陆成功",
				data: user,
				accessToken,
			}
		}
	} catch (error) {
		console.log(error)
	}
}

async function checkLogin(ctx) {
	ctx.body = {
		code: 200,
		msg: 'accessToken在有效期',
		data: ctx.request.user
	}
}

async function logout(ctx) {
	console.log("user [%s] logout ", ctx.request.user.uid)
	//token del
	ctx.body = {
		code: 200,
		msg: '退出登陆成功'
	}
}

async function register(ctx) {
	console.log(
		"someone want to regsiter [%s:%s]",
		ctx.request.body.name,
		ctx.request.body.passwd
	)
	const {
		name,
		passwd
	} = ctx.request.body
	try {
		const res = await users.getUserInfo(name)
		if (res.rows.length) {
			ctx.body = {
				code: 403,
				msg: "该用户名已被使用!",
			}
			return
		}
		await users.createUser(name, passwd)
		ctx.body = {
			code: 200,
		}
	} catch (error) {
		console.log(error)
	}
}

//生成token
function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
	})
}

//验证token中间件
async function authToken(ctx, next) {
	const authHeader = ctx.headers["authorization"]
	const token = authHeader?.split(" ")[1]
	if (!token) {
		ctx.status = 401
		ctx.body = "需要认证Token"
		return
	}

	await jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, user) => {
			if (err) {
				console.log(`Token解析失败:${err}`);
				if (err.name == 'TokenExpiredError') {
					ctx.status = 401
					ctx.body = err.message
					return
				}
				ctx.status = 403
				ctx.body = "非法token"
				return
			}
			ctx.request.user = user
			await next()
		}
	)
}

async function checkUserName(ctx) {
    const {
        name
    } = ctx.query
    let result = await users.getUserCount(name)
    let count = result.rows[0].count

    ctx.body = {
        code: 200,
        data: {
            name,
            count
        }
    }
}


module.exports = {
	doLogin,
	checkLogin,
	register,
	logout,
	authToken,
	checkUserName
}