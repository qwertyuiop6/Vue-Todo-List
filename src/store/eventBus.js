//event bus 事件总线
import Vue from "vue";

const estore = new Vue({
  data: {
    userInfo: { name: "guy", uid: 0 },
    loginStatus: false
  },
  created() {
    this.$on("updateUser", ({ info, status }) => {
      this.userInfo = info;
      this.loginStatus = status;
    });
  }
});

//1.提供一个安装方法,以插件形式注册
estore.install = (Vue, opts) => {
  Vue.prototype.$store = estore;
};

//2.导出一个Vue实例作为简单的状态储存和事件分发对象
export default estore;
