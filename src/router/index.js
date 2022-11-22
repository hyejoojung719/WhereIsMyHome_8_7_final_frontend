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
    redirect: "/map/list",
    children: [
      {
        path: "list",
        name: "apartList",
        component: () => import("@/components/map/SearchView"),
      },
      {
        path: "myhouse",
        name: "myhouse",
        component: () => import("@/components/map/MyHouse"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/AppUser.vue"),
    children: [
      {
        path: "/signin",
        name: "userSignIn",
        component: () => import("@/components/user/UserSignIn.vue"),
      },
      {
        path: "/signup",
        name: "userSignUp",
        component: () => import("@/components/user/UserSignUp.vue"),
      },
    ],
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/AppBoard"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "list",
        name: "boardwrite",
        component: () => import("@/components/board/BoardWrite"),
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
