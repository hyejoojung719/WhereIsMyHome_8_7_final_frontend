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
        console.log("발급받은 토큰 : ", typeof token);

        // axios 요청 대신에 header에 access-token 추가
        // http.defaults.headers.common["access-token"] = token;

        //userStore에 token 정보 저장
        commit("SET_TOKEN", { token });

        let decodedToken = jwt_decode(token);
        console.log("토큰 정보 : ", decodedToken);

        //vuex에 userInfo 정보 저장
        // const { userId } = decodedToken;
        // console.log("userId : ", userId);
        commit("SET_USER_INFO", data.userInfo);

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
        return true;
      } catch (error) {
        return false;
      }
    },

    // 회원 정보 가져오기(비밀번호 X)
    async getUserInfo() {
      try {
        let { data } = await http.get("/users");
        return data;
      } catch (error) {
        return false;
      }
    },

    //회원 정보 수정(비밀번호 X)
    async updateUserInfo({ commit }, payload) {
      try {
        await http.put("/users", payload);
        commit("SET_USER_INFO", payload);
        return true;
      } catch (error) {
        return false;
      }
    },

    //회원 정보 수정(비밀번호)
    async updatePassword(context, payload) {
      try {
        await http.put("/users/pass", payload);
        return true;
      } catch (error) {
        return false;
      }
    },

    //회원 정보 삭제
    async deleteUserInfo({ commit }) {
      try {
        await http.delete("/users");
        //userStore에 token 정보 지우기
        commit("SET_TOKEN", { token: null });
        //vuex store에 유저정보 비우기
        commit("SET_USER_INFO", {});
        return true;
      } catch (error) {
        return false;
      }
    },

    //아이디 확인
    async findId(context, payload) {
      try {
        if (payload == null) return null;
        let { data } = await http.post("/users/find", payload);
        return data;
      } catch (error) {
        return null;
      }
    },

    //임시 비밀번호 생성 및 이메일 발송
    async sendEmail(context, payload) {
      if (payload == null) return null;
      let { data } = await http.get("/users/find?user_id=" + payload.user_id);
      return data;
    },

    //관리자 회원 정보 불러오기
    async selectUserListAll(context, payload) {
      let { data } = await http.post("/users/admin/list", payload); //user_id 존재
      return data;
    },

    //관리자 회원 정보 삭제
    async deleteUserList(context, payload) {
      try {
        await http.patch("/users/admin", payload); //payload에 선택된 값(selected), user_id값 존재
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export default userStore;
