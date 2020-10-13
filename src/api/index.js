import Vue from "vue";
import * as todo from "./todo";
import auth from "./auth";

Vue.prototype.$api = {
  todo,
  auth
};
