/* eslint-disable no-cond-assign */
import { http } from "./axios";
import QS from "qs";

//封装get,post请求
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [url参数]
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    http
      .get(url, {
        params,
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
 * @param {Object} body [请求时携带的body数据]
 */
function post(url, body, opts = null) {
  return new Promise((resolve, reject) => {
    http
      .post(url, opts?.headers?.["Content-Type"] ? body : QS.stringify(body), opts)
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
    http
      .delete(url, { params })
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
 * @param {Object} body [请求时携带的body参数]
 */
function patch(url, body) {
  return new Promise((resolve, reject) => {
    http
      .patch(url, QS.stringify(body))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { get, post, del, patch };
