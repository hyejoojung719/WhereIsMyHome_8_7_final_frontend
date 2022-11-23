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
        redirect: "mypage/myinfo",
        component: () => import("@/views/AppUserMyPage.vue"),
        children: [
          {
            path: "myinfo",
            name: "userMyPage",
            component: () => import("@/components/user/UserMyPage.vue"),
          },
          {
            path: "update",
            name: "userUpdateMyPage",
            componetn: () => import("@/components/user/UserUpdateMyPage.vue"),
          },
        ],
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
        path: "write",
        name: "boardwrite",
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "view",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "modify",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify"),
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
