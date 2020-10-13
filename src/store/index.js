import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: { name: "guyyyy", uid: 0 },
    loginStatus: false
  },
  mutations: {
    updateUser(state, { info, status }) {
      state.userInfo = info;
      state.loginStatus = status;
    }
  },
  actions: {
    updateUser({ commit }, userInfo) {
      commit("updateUser", userInfo);
    }
  },
  getters: {
    loginStatus: state => state.loginStatus
  },
  modules: {}
});
