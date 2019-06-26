# vue-todolist

> 一个从前台到后端到数据库完整的 TodoList

## How Use?

```bash
# 安装依赖
$ yarn install

# 构建和启动服务
$ yarn run build
$ yarn start


# 前台开发
$ yarn run serve
# 后台开发(先build前端)
$ yarn run dev
# Pgsql配置
configs/dbConf.js
```

## How Works?

- 前端: Vue + Axios + LocalStorage
- UI: Element-UI
- 后台: Koa.js+ Koa-router + Koa-Session
- 数据库: Postgresql
