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
    component: () => import("../views/index/index.vue"),
    children:[
      {
        path: "/userLog",
        name: "登录日志",
        component: () => import("../views/userLog/userLog.vue")
      },
      {
        path: "/badCompany",
        name: "垃圾企业排行榜",
        component: () => import("../views/badCompany/badCompany.vue")
      },
      {
        path: "/excellentCompany",
        name: "优秀企业排行榜",
        component: () =>
          import("../views/excellentCompany/excellentCompany.vue"),
      },
      {
        path: "/companyManage",
        name: "企业管理",
        component: () => import("../views/companyManage/companyManage.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
