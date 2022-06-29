import { ElMessage } from "element-plus";
import router from "../../router";

//请求之前检测,加请求头
function beforeRequest(config) {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
}

//响应成功数据处理
function responseSuccess(response) {
  const { data } = response;
  console.log("请求响应正常:", data);
  if (Object.hasOwn(data, "accessToken")) {
    localStorage.setItem("accessToken", data.accessToken);
    console.log("accessToken已更新");
    import.meta.env.DEV && ElMessage.success("token已更新" + data.accessToken);
  }
  return Promise.resolve(data);
}

//响应错误处理
function responseError(error) {
  const { response } = error;
  if (!response && !window.navigator.onLine) {
    console.error("无网络");
    return Promise.reject("请检查网络连接");
  }
  console.log("请求响应错误:", response);
  const { status, data, statusText } = response;
  switch (status) {
    case 401:
      // app.config.globalProperties.$message.warning("登陆状态失效,请重新登录");
      ElMessage.warning("登陆状态失效,请重新登录");
      localStorage.removeItem("accessToken");
      setTimeout(() => {
        router.push({ name: "Home", params: {} });
      }, 1000);
      return;
    case 403:
      return ElMessage.error("非法请求!");
    case 500:
      // app.config.globalProperties.$message.error("服务器出问题啦,请稍后重试");
      return ElMessage.error("服务器出问题啦,请稍后重试~");
    default:
      return Promise.reject(data ?? statusText);
  }
}

export { beforeRequest, responseSuccess, responseError };
