import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/AppMain.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/AppMap.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/AppUser.vue"),
    children: [
      {
        path: "/login",
        name: "userLogin",
        component: () => import("@/component/user/UserLogin.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
