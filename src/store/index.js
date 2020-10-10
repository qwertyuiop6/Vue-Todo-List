import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: { name: "guyyyy", uid: 0 },
    loginStatus: false
  },
  mutations: {},
  actions: {},
  modules: {}
});
