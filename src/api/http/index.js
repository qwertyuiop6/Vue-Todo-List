/* eslint-disable no-cond-assign */
import { http } from "./axios";
// import QS from "qs";
import { ElLoading, ElMessage } from "element-plus";

function request(
  method,
  url,
  params,
  { loading = false, showError = true, confirm = false, headers = {} } = {}
) {
  let loadingInstance;
  if (loading) loadingInstance = ElLoading.service();

  return new Promise((resolve, reject) => {
    const payload = method === "GET" || method === "DELETE" ? { params } : { data: params };
    http({
      method,
      url,
      headers,
      ...payload,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        showError && ElMessage.error(err.data.error);
        reject(err);
      })
      .finally(() => {
        if (loading) loadingInstance.close();
      });
  });
}

const get = (url, params) => request("GET", url, params, { loading: false });
const post = (url, params, headers = {}) => request("POST", url, params, { headers });
const patch = (url, params) => request("PATCH", url, params);
const del = (url, params) => request("DELETE", url, params);

// function get(url, params) {
//   return new Promise((resolve, reject) => {
//     http
//       .get(url, {
//         params,
//       })
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }
// function post(url, body, opts = null) {
//   return new Promise((resolve, reject) => {
//     http
//       .post(url, opts?.headers?.["Content-Type"] ? body : QS.stringify(body), opts)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// function del(url, params) {
//   return new Promise((resolve, reject) => {
//     http
//       .delete(url, { params })
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// function patch(url, body) {
//   return new Promise((resolve, reject) => {
//     http
//       .patch(url, QS.stringify(body))
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

export { get, post, del, patch };
