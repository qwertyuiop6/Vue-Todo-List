import { get, post } from "../utils/http";
import api from "../config/api";
const loginAPI = api.login;

function login(params) {
  return post(loginAPI + "/login", params);
}

function checkToken() {
  return get(loginAPI + "/checkToken");
}

function register(params) {
  return post(loginAPI + "/register", params);
}

function logout(params) {
  return post(loginAPI + "/logout", params);
}

export default {
  login,
  logout,
  checkToken,
  register,
};
