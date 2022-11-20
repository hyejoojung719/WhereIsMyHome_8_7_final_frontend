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
        path: "signin",
        name: "userSignIn",
        component: () => import("@/components/user/UserSignIn.vue"),
      },
      {
        path: "signup",
        name: "userSignUp",
        component: () => import("@/components/user/UserSignUp.vue"),
      },
      {
        path: "mypage",
        name: "mypage",
        component: () => import("@/views/AppUserMyPage.vue"),
        children: [
          {
            path: "/",
            name: "userMyPage",
            component: () => import("@/components/user/UserMyPage.vue"),
          },
          {
            path: "update",
            name: "userUpdate",
            componetn: () => import("@/components/user/UserUpdateMyPage.vue"),
          },
        ],
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
