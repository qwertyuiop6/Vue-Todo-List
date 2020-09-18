# vue-todolist

> 一个从前台到后端到数据库完整的 TodoList

## How Use?

```bash
# 安装依赖
$ yarn

# 数据库表导入Pgsql
server/db/todolist.sql
# Pgsql连接配置
server/config/dbConf.js

# 构建前端页面
$ yarn build
# 启动后台服务
$ cd server
$ yarn&&yarn start


# 后台开发
$ yarn run dev
# 前台开发
$ yarn run serve
```

## How Works?

- 前端: Vue + Axios + LocalStorage
- UI: Element-UI
- 后台: Koa.js + Koa-router + Koa-Session
- 数据库: Postgresql
