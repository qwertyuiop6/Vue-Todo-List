import * as todo from "./todo";
import auth from "./auth";
import user from "./user";

export default {
  install: (app) => {
    app.config.globalProperties.$api = {
      todo,
      auth,
      user,
    };
  },
};
