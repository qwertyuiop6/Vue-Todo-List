//event bus 事件总线
import Vue from "vue";

const vue = new Vue({
  data: {
    userInfo: { name: "guyyyy", uid: 0 },
    loginStatus: false
  },
  created() {
    this.$on("updateUser", ({ info, status }) => {
      this.userInfo = info;
      this.loginStatus = status;
    });
  }
});

//导出一个Vue实例作为简单的状态储存和事件分发对象
export default vue;
