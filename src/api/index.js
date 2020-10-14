import Vue from "vue";
import * as todo from "./todo";
import auth from "./auth";
import user from "./user";

Vue.prototype.$api = {
  todo,
  auth,
  user
};
