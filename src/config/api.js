//axios环境baseUrl配置

//导出不同构建模式后端的接口地址
export const backend = {
  development: "http://localhost:8000",
  production: "",
  vercel: ""
};

//默认导出API接口配置
export default {
  todo: "/api/data/todo",
  auth: "/api/auth",
  user: "/api/user"
};
