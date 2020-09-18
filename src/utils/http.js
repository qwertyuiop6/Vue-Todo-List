import axios from "axios";
import QS from "qs";
import { development as dev, production as pro } from "../config/api";

if (process.env.NODE_ENV == "development") {
  // axios.defaults.baseURL = dev;
  axios.defaults.withCredentials = true;
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = pro;
}

axios.defaults.timeout = 10000;

//设置类型为表单类型，基本请求,避免复杂请求的option请求
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//封装get,post请求
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [url参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的body参数]
 */
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的url参数]
 */
function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * patch方法，对应patch请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的body参数]
 */
function patch(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { get, post, del, patch };
