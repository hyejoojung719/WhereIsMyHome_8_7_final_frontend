import http from "@/util/http";
// import router from "@/router";

const mapStore = {
  namespaced: true,
  state: () => ({
    sidos: [{ value: null, text: "시/도" }],
    guguns: [{ value: null, text: "구/군" }],
    dongs: [{ value: null, text: "동" }],
    houses: [],
    markers: [],
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
    // SET_MARKERS_LIST(state, markers) {
    //   state.markers = markers;
    // },

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
    // CLEAR_MARKERS_LIST(state) {
    //   state.markers = [];
    // },
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

    // markers 위치 셋팅하기
    setMarkers() {
      // 기존 마커 표시 제거하기
      /* global kakao */
      // console.log("markers 길이 : ", this.markers.length);
      // if (this.markers.length > 0) {
      //   this.markers.forEach((marker) => marker.setMap(null));
      // }
      console.log(this.houses);

      for (let i = 0; i < this.houses[0].length; i++) {
        let lng = this.houses[0][i].lng;
        let lat = this.houses[0][i].lat;
        this.markers.push([parseFloat(lat), parseFloat(lng)]);
      }

      const positions = this.markers.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
  },
};

export default mapStore;
