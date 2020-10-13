import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import TodoList from "@/views/todo/todoList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Todolist",
        component: TodoList,
        props: true
      },
      {
        path: "/editTodo/:todoId",
        name: "EditTodo",
        component: () => import("@/components/editTodo.vue")
      }
    ]
  },
  {
    path: "/user/:uid",
    name: "user",
    component: () => import(/* webpackChunkName: "about" */ "@/views/user/index.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
