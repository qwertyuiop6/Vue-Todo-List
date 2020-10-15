import Vue from "vue";
import * as todo from "./todo";
import auth from "./auth";
import user from "./user";
import { http } from "../utils/http";

Vue.prototype.$api = {
  todo,
  auth,
  user
};

Vue.prototype.$http = http;
