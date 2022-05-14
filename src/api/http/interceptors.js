import { createApp } from "vue";
import ElementPlus from "element-plus";
import router from "../../router";

const app = createApp();
app.use(ElementPlus);

//请求之前检测,加请求头
function beforeRequest(config) {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
}

//响应成功数据处理
function responseSuccess(response) {
  console.log("请求响应正常:", response.data);
  // eslint-disable-next-line no-prototype-builtins
  if (response.data?.hasOwnProperty("accessToken")) {
    localStorage.setItem("accessToken", response.data.accessToken);
    console.log("accessToken已更新");
  }
  return Promise.resolve(response);
}

//响应错误处理
function responseError(error) {
  const { response } = error;
  if (!response && !window.navigator.onLine) {
    console.error("无网络");
    return Promise.reject("请检查网络连接");
  }
  console.log("请求响应错误:", response);
  const { status } = response;
  if (status == 401) {
    app.config.globalProperties.$message.warning("登陆状态失效,请重新登录");
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      router.push({ name: "Home", params: {} });
    }, 1000);
  } else if (status >= 500) {
    app.config.globalProperties.$message.error("服务器出问题啦,请稍后重试");
  }
  return Promise.reject(response);
}

export { beforeRequest, responseSuccess, responseError };
