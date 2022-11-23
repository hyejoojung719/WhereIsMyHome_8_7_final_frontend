import http from "@/util/http";
// import router from "@/router";

const mapStore = {
  namespaced: true,
  state: () => ({
    sidos: [{ value: null, text: "시/도" }],
    guguns: [{ value: null, text: "구/군" }],
    dongs: [{ value: null, text: "동" }],
    houses: [],
    schools: [],
    buses: [],
    myHouses: [],
    dongObj: {},
  }),
  getters: {},
  mutations: {
    // state 셋팅
    SET_DONGOBJ_LIST(state, dongObj) {
      state.dongObj = dongObj;
    },
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
    SET_SCHOOL_LIST(state, schools) {
      state.schools = schools;
    },
    SET_BUS_LIST(state, buses) {
      state.buses = buses;
    },
    SET_MYHOUSE_LIST(state, myHouses) {
      state.myHouses = myHouses;
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
    CLEAR_SCHOOL_LIST(state) {
      state.schools = [];
    },
    CLEAR_BUS_LIST(state) {
      state.buses = [];
    },
    CLEAR_MYHOUSE_LIST(state) {
      state.myHouses = [];
    },
  },
  actions: {
    // 현재 위치 아파트 리스트 가져오기
    async getCurHouseList({ commit }, curLocation) {
      const params = {
        curlat: curLocation.curlat,
        curlng: curLocation.curlng,
      };

      try {
        let { data } = await http.get(`/apart/curApart`, { params });
        commit("SET_HOUSE_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // 주소 가져오기
    async getAddr({ commit }, dongCode) {
      const params = {
        dongCode: dongCode,
      };
      try {
        let { data } = await http.get(`dong/addr`, { params });
        commit("SET_DONGOBJ_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

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
        // console.log("검색 버튼 누르고 data : ", data);
        commit("SET_HOUSE_LIST", data[0]);
      } catch (error) {
        console.log(error);
      }
    },

    // 학교 정보 가져오기
    async getCurSchool({ commit }, curLoc) {
      const params = {
        curlat: curLoc.lat,
        curlng: curLoc.lng,
      };
      try {
        let { data } = await http.get(`/infra/school`, { params });
        commit("SET_SCHOOL_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // 버스정류장 정보 가져오기
    async getCurBus({ commit }, curLoc) {
      const params = {
        curlat: curLoc.lat,
        curlng: curLoc.lng,
      };
      try {
        let { data } = await http.get(`/infra/bus`, { params });
        commit("SET_BUS_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // 아파트 검색하기
    async getByKeyword({ commit }, keyword) {
      const params = {
        keyword: keyword,
      };
      try {
        let { data } = await http.get(`/apart/search`, { params });
        // console.log("돋보기 누르고 data : ", data);
        commit("SET_HOUSE_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },

    // 관심 아파트 등록하기
    async insertMyApart({ commit }, house) {
      console.log(commit);

      try {
        await http.post(`/apart/myHouse`, house);
      } catch (error) {
        console.log(error);
      }
    },

    // 관심 아파트 목록 가져오기
    async getMyApart({ commit }) {
      try {
        let { data } = await http.get(`/apart/myHouse`);
        commit("SET_MYHOUSE_LIST", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default mapStore;
