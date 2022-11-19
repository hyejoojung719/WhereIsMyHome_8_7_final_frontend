import http from "@/util/http";
// import router from "@/router";
import jwt_decode from "jwt-decode";

const userStore = {
  namespaced: true,
  state: () => ({
    userInfo: {}, //로그인한 유저 정보
    token: null,
    saveUserId: { saveCheck: false, saveId: "" },
  }),
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
    SET_SAVE_USER_ID(state, payload) {
      state.saveUserId = payload;
    },
  },
  actions: {
    //로그인
    async signIn({ commit }, payload) {
      try {
        let { data } = await http.post("/users/signIn", payload.signinInfo);

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

        //vuex에 saveId 정보 저장
        const { saveCheck, saveId } = payload;
        if (saveCheck) {
          commit("SET_SAVE_USER_ID", { saveCheck: true, saveId: saveId });
        } else {
          commit("SET_SAVE_USER_ID", { saveCheck: false, saveId: "" });
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    //로그아웃
    signOut({ commit }) {
      //userStore에 token 정보 지우기
      commit("SET_TOKEN", { token: null });
      //vuex store에 유저정보 비우기
      commit("SET_USER_INFO", {});
    },

    //중복 아이디 체크
    async idCheck(context, payload) {
      let { data } = await http.get("/users/check?user_id=" + payload.user_id);
      return data;
    },

    //회원가입
    async regist(context, payload) {
      try {
        await http.post("/users", payload);
      } catch (error) {
        alert("등록 실패");
      }
    },
  },
};

export default userStore;
