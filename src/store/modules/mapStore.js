import http from "@/util/http";
// import router from "@/router";

const mapStore = {
  namespaced: true,
  state: () => ({
    sidos: [{ value: null, text: "시/도" }],
    guguns: [{ value: null, text: "구/군" }],
    dongs: [{ value: null, text: "동" }],
    houses: [],
  }),
  getters: {},
  mutations: {
    // state 셋팅
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.dongCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.dongCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },

    // 리스트 초기화
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시/도" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구/군" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "동" }];
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = [];
    },
  },
  actions: {
    // sido 정보 가져오기
    async getSido({ commit }) {
      try {
        let { data } = await http.get(`dong/sido`);
        commit("SET_SIDO_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // gugun 정보 가져오기
    async getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      try {
        let { data } = await http.get(`/dong/gugun`, { params });
        commit("SET_GUGUN_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // dong 정보 가져오기
    async getDong({ commit }, gugunCode) {
      const params = { gugun: gugunCode };
      try {
        let { data } = await http.get(`/dong/dong`, { params });
        commit("SET_DONG_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // 아파트 정보 가져오기
    async getHouseList({ commit }, searchInfo) {
      const params = {
        dongCode: searchInfo.dongCode.substr(0, 8),
      };

      try {
        let { data } = await http.get(`/apart/apartInfo`, { params });
        commit("SET_HOUSE_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default mapStore;
