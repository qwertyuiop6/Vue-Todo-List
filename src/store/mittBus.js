//event bus 事件总线,使用一个vue实例作为简单的状态储存和事件分发对象
import mitt from "mitt";

// const estore = new Vue({
//   data: {
//     userInfo: { name: "guy", uid: 0, avatar: "" },
//   },
//   created() {
//     this.$on("setUserState", ({ userInfo }) => {
//       this.userInfo = userInfo;
//     });
//   },
//   computed: {
//     loginStatus() {
//       return this.userInfo.uid > 0;
//     },
//   },
// });
const bus = new mitt();

export default {
  install: (app) => {
    app.config.globalProperties.$bus = bus;
  },
};
