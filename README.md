# vue-todolist

> 一个从前端到后端到数据库完整的 TodoList

## How Use?

### 安装依赖

```shell
$ yarn
```

### 配置

```bash
# 总配置
server/app.config.js
# Pgsql导入数据库表
server/configs/todolist.sql
# Pgsql和Redis配置
server/configs/db.js
# Jwt secret,expires配置
server/configs/token.js
# Cos对象云存储相关配置
server/configs/cos.js
```

### 启动

```bash
# 构建前端页面
$ yarn build
# 启动后台服务
$ cd server
$ yarn&&yarn start
```

## How Dev?

```bash
# 前端开发
$ yarn serve
# 后端开发
$ cd server
$ yarn dev
```

## How Works?

- 前端: Vue + Vue-Router + EventBus-Store (Vuex)
  - UI: Element-UI + Scss
  - 网络: Axios
  - 持久化: LocalStorage
- 后端: Koa2 + koa-router + koa-static + koa-cors
  - 数据库: Postgresql(pg) + Base DML + Redis(ioredis)
  - 会话认证管理: JWT + Redis-blocklist
  - 日志: koa-logger + chalk
  - 存储,云: koa-body + cos-sdk(tx)
  - Other: check-fresh, Passwd Hash+Salt(crypto)
- CI-CD : Git + [Vercel](https://vercel.com/)
