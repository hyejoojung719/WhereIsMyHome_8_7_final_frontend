<template>
  <div id="app">
    <v-app>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" sm="3">
            <v-select v-model="sido" :items="sidos" @change="gugunList" solo return-object></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select v-model="gugun" :items="guguns" @change="dongList" solo return-object></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select v-model="dong" :items="dongs" solo return-object></v-select>
          </v-col>
          <v-btn color="secondary" @click="searchHouse">검색</v-btn>
        </v-row>
      </v-container>
    </v-app>
    <div id="app" class="d-flex justify-content-start">
      <v-app id="inspire">
        <v-card class="apartinfo mx-auto" v-if="houses[0] && houses[0].length != 0" min-width="300" min-height="700">
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
        <v-card v-else class="apartinfo mx-auto" min-width="300" min-height="700"> </v-card>
      </v-app>
      <v-app id="detail_card">
        <v-card
          class="apartinfo mx-auto"
          min-width="300"
          min-height="700"
          id="detail_card_content"
          style="display: none"
        >
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
      <div id="map">
        <div id="infra">
          <v-card elevation="5" width="50">
            <v-list dense rounded>
              <v-list-item link class="px-0">
                <v-img src="@/assets/img/school_icon.png" width="10px" @click="getSchoolInfo"></v-img>
              </v-list-item>
              <v-list-item link class="px-0">
                <v-img src="@/assets/img/bus_icon.png" width="10px"></v-img>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </div>
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
      sido: null,
      gugun: null,
      dong: null,
      markers: [],
      curlat: 36.366701,
      curlng: 127.344307,
      markerParam: {
        arr: [], // 마커 표시할 위치 담은 배열
        txt: "", // 표시할 이미지 다르게 하기위한 마커 이름 house, housepick, school, current, bus, hospital...
      },
    };
  },
  computed: {
    ...mapState("mapStore", ["sidos", "guguns", "dongs", "houses", "schools"]),
  },
  async created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_SCHOOL_LIST();
    this.getSido(); // 시도 정보 가져오기

    let curloc = {
      curlat: this.curlat,
      curlng: this.curlng,
    };

    await this.getCurHouseList(curloc);
    console.log("현재 주변 아파트 : ", this.houses);
  },
  methods: {
    ...mapActions("mapStore", ["getSido", "getGugun", "getDong", "getCurHouseList", "getHouseList", "getSchoolList"]),
    ...mapMutations("mapStore", [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_SCHOOL_LIST",
    ]),

    // 구군 정보 가져오기
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugun = null;
      if (this.sido.value) {
        this.getGugun(this.sido.value.substr(0, 2));
      }
    },

    // 동 정보 가져오기
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dong = null;
      if (this.gugun.value) {
        this.getDong(this.gugun.value.substr(0, 5));
      }
    },

    // 아파트 리스트 가져오기
    async searchHouse() {
      this.CLEAR_HOUSE_LIST();

      let searchInfo = {
        dongCode: this.dong.value,
      };

      if (this.dong.value) {
        await this.getHouseList(searchInfo);
      }

      if (!(this.houses[0] && this.houses[0].length != 0)) {
        alert("매물 정보가 없습니다. ");
        this.initMap();
        // 현재 위치 아파트 가져오기
      } else {
        this.markerDel();
        this.markerParam.arr = this.houses[0];
        this.markerParam.txt = "house";
        this.displayMarkers();
      }
    },

    // gps로 사용자의 현재 위치 받아오는 함수, Promise를 리턴
    getMyGps() {
      return new Promise((resolve, rejected) => {
        navigator.geolocation.getCurrentPosition(resolve, rejected);
      });
    },

    // 현재 위치로 curlat, curlng 설정
    async currentLoc() {
      try {
        let position = await this.getMyGps();
        this.curlat = position.coords.latitude;
        this.curlng = position.coords.longitude;
      } catch (error) {
        alert("현재 위치를 표시할 수 없습니다. ");
      }
    },

    // 지도 표시
    async initMap() {
      // 현재 위치 기준으로 표시
      this.currentLoc();

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.curlat, this.curlng),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      // 현재 위치에 마커 표시
      let current = {
        lat: this.curlat,
        lng: this.curlng,
      };
      this.markerParam.arr = [current];
      this.markerParam.txt = "current";
      this.displayMarkers();
    },

    //지도에 marker 표시하기
    displayMarkers() {
      // markers 초기화
      this.markers = [];

      // 파라미터 값 가져오기
      let arr = this.markerParam.arr;
      let txt = this.markerParam.txt;

      for (let i = 0; i < arr.length; i++) {
        let lng = arr[i].lng;
        let lat = arr[i].lat;
        this.markers.push([parseFloat(lat), parseFloat(lng)]);
      }

      let positions = this.markers.map((position) => new kakao.maps.LatLng(...position));

      var imageSrc;
      if (txt == "house") {
        imageSrc = require("@/assets/img/house_marker.png");
      } else if (txt == "school") {
        imageSrc = require("@/assets/img/school_marker.png");
      } else if (txt == "current") {
        imageSrc = require("@/assets/img/current_marker.png");
      }
      var imageSize = new kakao.maps.Size(40, 40);
      var imageOption = { offset: new kakao.maps.Point(13, 37) };

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
    markerPick(house) {
      this.markerDel();
      this.markerParam.arr = [house];
      this.markerParam.txt = "house";
      this.displayMarkers();
    },

    // 마커 초기화(기존 마커들 지우기)
    markerDel() {
      this.markerParam.arr = [];
      this.markerParam.txt = "house";
      this.displayMarkers();
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
      // 해당 마커 보여주기
      this.markerPick(house);

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

    // 학교 정보 가져오고 마커 표시하기
    async getSchoolInfo() {
      let sidoName = this.sido.text;
      let gugunName = this.gugun.text;

      let areaInfo = {
        sido: sidoName,
        gugun: gugunName,
      };
      await this.getSchoolList(areaInfo);

      this.markerDel();
      this.markerParam.arr = this.schools;
      this.markerParam.txt = "school";
      this.displayMarkers();
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
  position: relative;
  z-index: 1;
}
.apartinfo {
  height: 700px;
  overflow-y: auto;
}

#infra {
  position: absolute;
  right: 20px;
  top: 250px;
  z-index: 2;
}
</style>
