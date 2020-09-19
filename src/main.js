import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/api/main"; //引入api
import "@/utils/filter"; //引入拦截器

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

console.log(
  `欢迎使用${process.env.VUE_APP_NAME},Version:${process.env.VUE_APP_VER}`
);
