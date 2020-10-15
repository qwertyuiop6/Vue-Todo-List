import axios from "axios";
import Vue from "vue";
import ElementUI from "element-ui";
import router from "../router";
Vue.use(ElementUI);

//Axios全局拦截器设置
//请求拦截加token
axios.interceptors.request.use(
  cfg => {
    const token = localStorage.getItem("accessToken");
    if (token) cfg.headers.authorization = `Bearer ${token}`;
    return cfg;
  },
  err => Promise.reject(err)
);

//响应拦截判断响应状态码,错误处理
axios.interceptors.response.use(
  res => {
    console.log("请求响应正常:", res.data);
    if (res.data?.hasOwnProperty("accessToken")) {
      localStorage.setItem("accessToken", res.data.accessToken);
      console.log("accessToken已更新");
    }
    return Promise.resolve(res);
  },
  err => {
    console.log(`请求响应错误:${err.response}`);
    const { status, data } = err.response;
    if (status == 401) {
      Vue.prototype.$message.warning("登陆状态失效,请重新登录");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        // location.reload();
        router.push({ name: "Home", params: {} });
      }, 1000);
      return;
    } else if (status >= 500) {
      Vue.prototype.$message.error("服务器出问题啦,请稍后重试");
      return;
    }
    return Promise.reject(err);
  }
);

Vue.prototype.$axios = axios;
