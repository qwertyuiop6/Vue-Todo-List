# vue-todolist

> 一个从前台到后端到数据库完整的 TodoList

## How Use?

```bash
# 安装依赖
$ yarn

# 数据库表导入Pgsql
server/configs/todolist.sql
# pgsql和redis配置
server/configs/db.js
# Jwt secret,expires配置
server/configs/token.js

# 构建前端页面
$ yarn build
# 启动后台服务
$ cd server
$ yarn&&yarn start


# 前端开发
$ yarn serve
# 后台开发
$ cd server
$ yarn dev

```

## How Works?

- 前端: Vue + Vue-Router + EventBus-Store (Vuex)
    * UI: Element-UI + Scss
    * 网络: Axios 
    * 持久化: LocalStorage
- 后端: Koa2 + koa-router + koa-static + koa-cors
    * 数据库: Postgresql(pg) + Base DML + Redis(ioredis)
    * 会话认证管理: JWT + Redis-blocklist
    * 日志: koa-logger + chalk
    * Other: check-fresh, Passwd Hash+Salt(crypto)
- CI-CD : Git + [Vercel](https://vercel.com/)
