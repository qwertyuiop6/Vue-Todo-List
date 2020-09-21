import axios from "axios";
//Axios全局拦截器

import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

//请求拦截加token
axios.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem("accessToken");
    if (token) cfg.headers.authorization = `Bearer ${token}`;
    return cfg;
  },
  (err) => Promise.reject(err)
);

//响应拦截判断响应状态码
axios.interceptors.response.use(
  (res) => {
    console.log("请求响应正常:", res.data);
    if (res.data?.data?.hasOwnProperty("accessToken")) {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      console.log("accessToken已更新");
    }
    return Promise.resolve(res);
  },
  (err) => {
    console.log(`请求响应错误:${err.response.data}`);
    if (err.response.status == 401) {
      Vue.prototype.$message.warning("登陆状态失效,请重新登录");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
    return Promise.reject(err);
  }
);

Vue.prototype.$axios = axios;
