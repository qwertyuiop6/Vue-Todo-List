import { get, post } from "../utils/http";
import API from "./api";

function login(body) {
  return post(API.auth + "/login", body);
}

function check() {
  return get(API.auth + "/token");
}

function register(body) {
  return post(API.auth + "/register", body);
}

function logout() {
  return post(API.auth + "/logout");
}

export { login, logout, check, register };
