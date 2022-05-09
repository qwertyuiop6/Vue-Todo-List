import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => ({
    userInfo: { name: "guyy", uid: 0 },
    loginStatus: false,
  }),
  getters: {
    loginStatus: (state) => state.userInfo.uid > 0,
  },
  actions: {
    updateUser(info) {
      this.userInfo = info;
    },
  },
});
