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
    // if (res.status.toString().startsWith('2')) {
    console.log("请求响应正常:", res.data);
    return Promise.resolve(res);
    // } else {
    //     console.log(`请求响应异常: ${res.data.code},${res.data.msg}`);
    //     return Promise.reject(res)
    // }
  },
  (err) => {
    console.log(`请求响应异常:${err.response.data}`);
    if (err.response.status == 401) {
      Vue.prototype.$message.warning("登陆状态失效,请重新登录");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
    Promise.reject(err);
  }
);

Vue.prototype.$axios = axios;
