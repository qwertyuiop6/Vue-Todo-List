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


# 前端开发
$ yarn serve
# 后台开发
$ cd server
$ yarn dev

```

## How Works?

- 前端: Vue + Axios + LocalStorage
- UI: Element-UI
- 后台: Koa.js + Koa-router + jwt + koa-cors2
- 数据库: Postgresql + pg + DML
