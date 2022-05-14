import axios from "axios";
import { beforeRequest, responseSuccess, responseError } from "./interceptors";

//-----解决跨域开发和不同环境部署后端api的访问问题-----
// 1.通过vue-cli-service自动设置的NODE_ENV变量判断环境
// import { backend } from "../config/api";
// if (process.env.NODE_ENV == "development") {
//   // axios.defaults.baseURL = backend.dev;
//   // axios.defaults.withCredentials = true;
// } else if (process.env.NODE_ENV == "production") {
//   // axios.defaults.baseURL = backend.pro;
// }else if (process.env.NODE_ENV == "vercel") {
//   axios.defaults.baseURL = backend.vercel;
// }

//2.通过.env文件根据不同环境加载不同的文件变量
const baseURL = import.meta.env.VITE_APP_AXIOS_BASE_URL;
if (baseURL) {
  axios.defaults.baseURL = baseURL;
}

//设置延时
axios.defaults.timeout = 10000;

//设置类型为表单类型，基本请求,避免复杂请求的option请求
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

//创造一个axios实例,用来当作普通的http客户端
const http = axios.create();

//请求拦截
http.interceptors.request.use(beforeRequest, (err) => Promise.reject(err));

//响应拦截
http.interceptors.response.use(responseSuccess, responseError);

export { http };

export default {
  install(app) {
    app.config.globalProperties.$axios = axios;
  },
};
