import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementIcons from "@element-plus/icons-vue";
import "virtual:windi.css";
import "virtual:windi-devtools";

import axios from "@/api/http/axios"; //引入axios
import api from "@/api"; //引入api
import router from "@/router"; //vue-router路由控制
// import store from "./store/vuex"; //vuex状态管理
// import store from './store/pinia'; //pinia
import { createPinia } from "pinia";
// import busStore from "@/store/mittBus";//mitt eventbus

const app = createApp({
  router,
  ...App,
});

//注册elementplus图标组件
Object.keys(ElementIcons).forEach((k) => {
  app.component(k, ElementIcons[k]);
});

app.use(router).use(createPinia()).use(axios).use(api).use(ElementPlus).mount("#app");

app.config.devtools = true;

console.log(`欢迎使用${import.meta.env.VITE_APP_NAME},Version:${import.meta.env.VITE_APP_VER}`);
