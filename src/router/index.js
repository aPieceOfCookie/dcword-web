import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "登录",
    component: () =>import( "../views/login/login.vue"),
  },
  {
    path: "/register",
    name: "注册",
    component: () => import("../views/register/register.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
