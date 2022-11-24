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
    path: "/admin",
    name: "admin",
    redirect: "admin/userList",
    component: () => import("@/views/AppAdmin.vue"),
    children: [
      {
        path: "userList",
        name: "adminUserList",
        component: () => import("@/components/user/AdminUserList.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/AppUser.vue"),
    children: [
      {
        path: "findID",
        name: "userFindID",
        component: () => import("@/components/user/UserFindId.vue"),
      },
      {
        path: "findIDResult",
        name: "userFindIDResult",
        component: () => import("@/components/user/UserFindIdResult.vue"),
      },
      {
        path: "findPassword",
        name: "userFindPassword",
        component: () => import("@/components/user/UserFindPassword.vue"),
      },
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
            component: () => import("@/components/user/UserUpdateMyPage.vue"),
          },
          {
            path: "delete",
            name: "userDeleteMyPage",
            component: () => import("@/components/user/UserDeleteMyPage.vue"),
          },
          {
            path: "myhouse",
            name: "userMyHouse",
            component: () => import("@/components/user/UserMyHouse.vue"),
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
