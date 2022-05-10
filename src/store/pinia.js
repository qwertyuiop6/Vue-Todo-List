import { defineStore } from "pinia";

const initUser = { name: "guy", uid: 0 };

export const useStore = defineStore("user", {
  state: () => ({
    userInfo: initUser,
    loginStatus: false,
  }),
  getters: {
    loginStatus: (state) => state.userInfo.uid > 0,
  },
  actions: {
    updateUser(info) {
      this.userInfo = info;
    },
    clearUser() {
      this.userInfo = initUser;
    },
  },
});
