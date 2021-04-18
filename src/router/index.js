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
  },
  {
    path: "/test",
    name: "测试",
    component: () => import("../views/test/test.vue")
  },
  {
    path: "/index",
    name: "主页",
    component: () => import("../views/index/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
