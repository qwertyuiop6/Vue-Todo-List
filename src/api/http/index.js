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
        console.log(err);
        showError && ElMessage.error(typeof err === "string" ? err : err.msg);
        reject(err);
      })
      .finally(() => {
        if (loading) loadingInstance.close();
      });
  });
}

const get = (url, params, opts) => request("GET", url, params, opts);
const post = (url, params, opts) => request("POST", url, params, opts);
const patch = (url, params, opts) => request("PATCH", url, params, opts);
const del = (url, params, opts) => request("DELETE", url, params, opts);

export { get, post, del, patch };
