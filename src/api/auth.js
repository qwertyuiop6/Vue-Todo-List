import { get, post } from "../utils/http";
import API from "../config/api";

function login(body) {
  return post(API.auth + "/login", body);
}

function checkToken() {
  return get(API.auth + "/checkToken");
}

function register(body) {
  return post(API.auth + "/register", body);
}

function logout() {
  return post(API.auth + "/logout");
}

export default {
  login,
  logout,
  checkToken,
  register
};
