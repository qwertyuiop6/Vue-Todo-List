# vue-todolist

> 一个从前台到后端到数据库完整的 TodoList

## How Use?

```bash
# 安装依赖
$ yarn install

# 表导入Pgsql
server/todo.sql
# Pgsql连接配置
server/config/dbConf.js

# 构建和启动服务
$ yarn run build
$ yarn start



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
