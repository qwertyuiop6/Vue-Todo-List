import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
// import TodoList from "@/views/todo/todoList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // props: true,
    // children: [
    // {
    //   path: "/",
    //   name: "Todolist",
    //   component: TodoList,
    //   props: true
    // },
    // {
    //   path: "/editTodo/:todoId",
    //   name: "EditTodo",
    //   component: () => import("@/components/editTodo.vue")
    // }
    // ],
  },
  {
    path: "/user/:uid",
    name: "User",
    component: () => import(/* webpackChunkName: "about" */ "@/views/user/userInfo.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
