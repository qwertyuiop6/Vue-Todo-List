import * as todo from "./todo";
import * as auth from "./auth";
import * as user from "./user";

export default {
  install: (app) => {
    app.config.globalProperties.$api = {
      todo,
      auth,
      user,
    };
  },
};
