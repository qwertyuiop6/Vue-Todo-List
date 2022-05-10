import axios from "axios";
import { createApp } from "vue";
import ElementPlus from "element-plus";
import router from "../router";

const app = createApp();
app.use(ElementPlus);

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

//请求拦截加token
http.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem("accessToken");
    if (token) cfg.headers.authorization = `Bearer ${token}`;
    return cfg;
  },
  (err) => Promise.reject(err)
);

//响应拦截判断响应状态码,错误处理
http.interceptors.response.use(
  (res) => {
    console.log("请求响应正常:", res.data);
    // eslint-disable-next-line no-prototype-builtins
    if (res.data?.hasOwnProperty("accessToken")) {
      localStorage.setItem("accessToken", res.data.accessToken);
      console.log("accessToken已更新");
    }
    return Promise.resolve(res);
  },
  (err) => {
    console.log("请求响应错误:", err.response);
    const { status } = err.response;
    if (status == 401) {
      app.config.globalProperties.$message.warning("登陆状态失效,请重新登录");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        router.push({ name: "Home", params: {} });
      }, 1000);
    } else if (status >= 500) {
      app.config.globalProperties.$message.error("服务器出问题啦,请稍后重试");
    }
    return Promise.reject(err.response);
  }
);

export { http };

export default {
  install(app) {
    app.config.globalProperties.$axios = axios;
  },
};
