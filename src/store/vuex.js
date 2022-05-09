import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: { name: "guyyyy", uid: 0 },
    loginStatus: false,
  },
  mutations: {
    updateUser(state, { info, status }) {
      state.userInfo = info;
      state.loginStatus = status;
    },
  },
  actions: {
    updateUser({ commit }, userInfo) {
      commit("updateUser", userInfo);
    },
  },
  getters: {
    loginStatus: (state) => state.userInfo.uid > 0,
  },
  modules: {},
});
