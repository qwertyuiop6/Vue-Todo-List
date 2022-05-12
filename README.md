# vue-todolist

> 一个从前端到后端到数据库完整的 TodoList

## How Use?

### 安装依赖

```shell
$ pnpm i&&cd server&&pnpm i&&cd ..
```

### 配置

```bash
# 配置
server/app.config.js
# Postgres导入数据库表
server/sql/todolist.sql
# Postgres,Redis连接和Jwt secret,expires
server/.env
# COS对象云存储API-KEY配置(可选)
server/services/.env
```

### 启动

```bash
# 构建前端页面
$ pnpm build
# 启动后台服务
$ pnpm start:server
```

### 使用 Docker-compose 直接部署启动

```shell
docker-compose up
```

## How Dev?

```bash
# 前端开发
$ pnpm dev
# 后端开发
$ cd server&&pnpm dev
```

## How Works?

- 前端: Vue3 + Vue-Router4 + Pinia
  - UI: Element-Plus + Scss + WindiCSS
  - 网络: Axios
  - 持久化: LocalStorage
- 后端: Koa2 + koa-router + koa-static + koa-cors
  - 数据库: Postgresql(pg) + Prisma2 + Redis(ioredis)
  - 会话认证管理: JWT + Redis-blocklist
  - 日志: koa-logger + chalk
  - 存储,云: koa-body + cos-sdk(tx)
  - Other: check-fresh, Passwd Hash+Salt(crypto)
- Container : Docker + Docker-compose
- CI-CD&&Deploy: Git + [Vercel](https://vercel.com/) + [Heroku](https://heroku.com/)
