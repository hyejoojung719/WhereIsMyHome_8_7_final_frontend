import http from "@/util/http";
// import router from "@/router";
import jwt_decode from "jwt-decode";

const userStore = {
  namespaced: true,
  state: () => ({
    userInfo: {}, //로그인한 유저 정보
    token: null,
  }),
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
  },
  actions: {
    async signIn({ commit } /*signinInfo*/) {
      console.log(commit);
      let { data } = await http.post("/users/signin", signinInfo);

      let token = data.token;
      console.log("발급받은 토큰 : ", token);

      // axios 요청 대신에 header에 access-token 추가
      // http.defaults.headers.common["access-token"] = token;

      //userStore에 token 정보 저장
      commit("SET_TOKEN", { token });

      let decodedToken = jwt_decode(token);
      console.log("토큰 정보 : ", decodedToken);

      //vuex에 userInfo 정보 저장
      const { id } = decodedToken;
      commit("SET_USER_INFO", { id: id });
    },
    signOut({ commit }) {
      //userStore에 token 정보 지우기
      commit("SET_TOKEN", { token: null });
      //vuex store에 유저정보 비우기
      commit("SET_USER_INFO", {});
    },
  },
};

export default userStore;
