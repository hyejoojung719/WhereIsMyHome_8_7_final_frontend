<template>
  <div id="app">
    <v-app>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" sm="3">
            <v-select v-model="sidoCode" :items="sidos" @change="gugunList" solo></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select v-model="gugunCode" :items="guguns" @change="dongList" solo></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select v-model="dongCode" :items="dongs" solo></v-select>
          </v-col>
          <v-btn color="secondary" @click="searchHouse">검색</v-btn>
        </v-row>
      </v-container>
    </v-app>
    <div id="app" class="d-flex justify-content-start">
      <v-app id="inspire">
        <v-card v-if="houses[0] && houses[0].length != 0" class="mx-auto" min-width="300" min-height="700">
          <v-list>
            <v-list-item-group color="secondary">
              <!-- @click="ddd(house)" -->
              <v-list-item v-for="(house, i) in houses[0]" :key="i">
                <v-list-item-icon>
                  <v-img src="@/assets/img/home_icon.png" width="30px"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title @click="makeDetailCard(house)" v-text="house.apartmentName"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card v-else class="mx-auto" min-width="300" min-height="700"> </v-card>
      </v-app>
      <v-app id="detail_card">
        <v-card class="mx-auto" min-width="300" min-height="700" id="detail_card_content" style="display: none">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>

          <v-card-title><span id="apartmentName">아파트이름</span></v-card-title>
          <div id="roadview" style="width: 100%; height: 300px"></div>
          <v-card-text>
            <div class="my-4 text-subtitle-1">주소</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-chip-group active-class="secondary accent-4 white--text" column>
              <v-chip>매물 정보</v-chip>
              <v-chip>실거래가</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-app>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9f2f61f8fb619932f1da3bd45427cbcd";
      document.head.appendChild(script);
    }
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      markers: [],
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
    ...mapActions("mapStore", ["getSido", "getGugun", "getDong", "getHouseList"]),
    ...mapMutations("mapStore", ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST", "CLEAR_HOUSE_LIST"]),

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
      let searchInfo = {
        dongCode: this.dongCode,
      };

      if (this.dongCode) {
        await this.getHouseList(searchInfo);
      }

      if (!(this.houses[0] && this.houses[0].length != 0)) {
        alert("매물 정보가 없습니다. ");
        this.initMap();
      } else {
        this.displayMarekrs();
      }
    },

    // 지도 표시
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
    },

    //지도에 marker 표시하기
    displayMarekrs() {
      // markers 초기화
      this.markers = [];

      for (let i = 0; i < this.houses[0].length; i++) {
        let h_lng = this.houses[0][i].lng;
        let h_lat = this.houses[0][i].lat;
        this.markers.push([parseFloat(h_lat), parseFloat(h_lng)]);
      }

      let positions = this.markers.map((position) => new kakao.maps.LatLng(...position));

      var imageSrc = require("@/assets/img/house_marker.png"),
        imageSize = new kakao.maps.Size(45, 45),
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
              image: markerImage,
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },

    // 특정 아파트 선택시 해당 위치로 마커 보여주기
    markerPeek(house) {
      // markers 초기화 및 해당 위치로 마커 이동
      this.markers = [];

      let lat = house.lat;
      let lng = house.lng;

      this.markers.push([parseFloat(lat), parseFloat(lng)]);

      const positions = this.markers.map((position) => new kakao.maps.LatLng(...position));
      var imageSrc = require("@/assets/img/house_marker.png"),
        imageSize = new kakao.maps.Size(45, 45),
        imageOption = { offset: new kakao.maps.Point(27, 69) };
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
              image: markerImage,
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },

    // 상세정보 카드 만들기
    makeDetailCard(house) {
      let item = document.getElementById("detail_card_content");
      item.style.display = "block";

      let lat = house.lat;
      let lng = house.lng;
      let apartmentName = house.apartmentName;

      // detail card 정보 셋팅
      document.getElementById("apartmentName").innerHTML = apartmentName;

      // 해당 위치로 마커 이동
      this.map.panTo(new kakao.maps.LatLng(lat, lng));
      // 다른 마커 삭제하고 해당 마커만 보여주기
      this.markerPeek(house);

      // 로드뷰 셋팅=================================================
      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      var position = new kakao.maps.LatLng(lat, lng); // lat, lng

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
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
#map {
  width: 100%;
  height: 700px;
}
.v-card {
  height: 700px;
  overflow-y: auto;
}
</style>
