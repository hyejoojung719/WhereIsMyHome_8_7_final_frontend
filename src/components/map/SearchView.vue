<template>
  <div id="app">
    <v-app>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" sm="3">
            <v-select
              v-model="sidoCode"
              :items="sidos"
              @change="gugunList"
              solo
            ></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select
              v-model="gugunCode"
              :items="guguns"
              @change="dongList"
              solo
            ></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select v-model="dongCode" :items="dongs" solo></v-select>
          </v-col>
          <!-- <v-col class="d-flex" sm="2">
            <v-text-field v-model="dealYear" label="매매년도" placeholder="매매년도" outlined></v-text-field>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-text-field v-model="dealMonth" label="매매월" placeholder="매매월" outlined></v-text-field>
          </v-col> -->
          <v-btn color="secondary" @click="searchHouse">검색</v-btn>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      // dealYear: "",
      // dealMonth: "",
    };
  },
  computed: {
    ...mapState("mapStore", ["sidos", "guguns", "dongs", "houses"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_HOUSE_LIST();
    this.getSido(); // 시도 정보 가져오기
  },
  methods: {
    ...mapActions("mapStore", [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
      "setMarkers",
    ]),
    ...mapMutations("mapStore", [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
    ]),

    // 구군 정보 가져오기
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) {
        this.getGugun(this.sidoCode.substr(0, 2));
      }
    },

    // 동 정보 가져오기
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) {
        this.getDong(this.gugunCode.substr(0, 5));
      }
    },

    // 아파트 리스트 가져오기
    async searchHouse() {
      console.log("호출");
      let searchInfo = {
        dongCode: this.dongCode,
      };

      if (this.dongCode) {
        await this.getHouseList(searchInfo);
        console.log(this.house);
        this.setMarkers();
      }

      if (!(this.houses[0] && this.houses[0].length != 0)) {
        alert("매물 정보가 없습니다. ");
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
a:hover {
  text-decoration: none !important;
}
</style>
