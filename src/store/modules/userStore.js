import http from "@/util/http";
import router from "@/router";

const userStore = {
  state: () => ({
    userInfo: {}, //로그인한 유저 정보
  }),
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    async signIn({ commit }, signinInfo) {
      console.log(commit);
      let { data } = await http.post("/users/signin");

      const { id } = data;
      commit("SET_USER_INFO", { id });
    },
    signOut({ commit }) {
      commit("SET_USER_INFO", {});
    },
  },
};

export default userStore;
