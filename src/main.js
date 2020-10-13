import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/api"; //引入api
import "@/utils/filter"; //引入axios拦截器
import router from "./router"; //vue-router路由控制
// import store from "./store"; //vuex状态管理
// import estore from "@/store/eventBus"; //事件总线作为简单状态管理
// Vue.prototype.$store = estore;
import estore from "@/store/eventBus";

Vue.use(estore);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");

console.log(`欢迎使用${process.env.VUE_APP_NAME},Version:${process.env.VUE_APP_VER}`);
