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
      <v-app id="searchlist">
        <v-card class="apartinfo mx-auto" v-if="houses && houses.length != 0" min-width="300" min-height="700">
          <v-text-field
            solo
            label="아파트 이름 검색"
            append-icon="fa-search"
            @click:append="searchApart"
            v-model="keyword"
          ></v-text-field>
          <v-list>
            <v-list-item-group color="secondary">
              <!-- @click="ddd(house)" -->
              <v-list-item v-for="(house, i) in houses" :key="i">
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
        <v-card v-else class="apartinfo mx-auto" min-width="300" min-height="700">
          <v-text-field
            solo
            label="아파트 이름 검색"
            append-icon="fa-search"
            @click:append="searchApart"
            v-model="keyword"
          ></v-text-field>
        </v-card>
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

          <v-card-title>
            <span id="apartmentName"></span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDetailCard">
              <v-icon>fa-close</v-icon>
            </v-btn>
          </v-card-title>

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
            <v-list id="category" dense rounded>
              <v-list-item link class="px-0">
                <v-img src="@/assets/img/school_icon.png" width="10px" @click="getSchoolInfo"></v-img>
              </v-list-item>
              <v-list-item link class="px-0">
                <v-img src="@/assets/img/bus_icon.png" width="10px" @click="getBusInfo"></v-img>
              </v-list-item>
              <v-list-item id="BK9" link class="px-0">
                <v-img src="@/assets/img/bank_icon.png" width="10px"></v-img>
              </v-list-item>
              <v-list-item id="MT1" link class="px-0">
                <v-img src="@/assets/img/mart_icon.png" width="10px"></v-img>
              </v-list-item>
              <v-list-item id="PM9" link class="px-0">
                <v-img src="@/assets/img/pharmacy_icon.png" width="10px"></v-img>
              </v-list-item>
              <v-list-item id="OL7" link class="px-0">
                <v-img src="@/assets/img/gas_icon.png" width="10px"></v-img>
              </v-list-item>
              <v-list-item id="CE7" link class="px-0">
                <v-img src="@/assets/img/cafe_icon.png" width="10px"></v-img>
              </v-list-item>
              <v-list-item id="CS2" link class="px-0">
                <v-img src="@/assets/img/store_icon.png" width="10px"></v-img>
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
      tempMarkers: [],
      curlat: 36.366701,
      curlng: 127.344307,
      markerParam: {
        arr: [], // 마커 표시할 위치 담은 배열
        txt: "", // 표시할 이미지 다르게 하기위한 마커 이름 house, housepick, school, current, bus, hospital...
      },
      keyword: "",
    };
  },
  computed: {
    ...mapState("mapStore", ["sidos", "guguns", "dongs", "houses", "schools", "buses"]),
  },
  async created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_SCHOOL_LIST();
    this.CLEAR_BUS_LIST();
    this.getSido(); // 시도 정보 가져오기
  },
  methods: {
    ...mapActions("mapStore", [
      "getSido",
      "getGugun",
      "getDong",
      "getCurHouseList",
      "getHouseList",
      "getCurSchool",
      "getCurBus",
      "getByKeyword",
    ]),
    ...mapMutations("mapStore", [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_SCHOOL_LIST",
      "CLEAR_BUS_LIST",
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
      // console.log(this.sido);
      if (this.sido == null) {
        alert("시/도 정보를 입력해주세요.");
      } else if (this.gugun == null) {
        alert("구/군 정보를 입력해주세요.");
      } else if (this.dong == null) {
        alert("동 정보를 입력해주세요.");
      } else {
        this.keyword = "";

        this.CLEAR_HOUSE_LIST();

        let searchInfo = {
          dongCode: this.dong.value,
        };

        if (this.dong.value) {
          await this.getHouseList(searchInfo);
        }

        if (!(this.houses && this.houses.length != 0)) {
          alert("매물 정보가 없습니다. ");
          this.initMap();
          // 현재 위치 아파트 가져오기
        } else {
          this.markerParam.arr = this.houses;
          this.markerParam.txt = "house";
          this.displayMarkers(true);
        }
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

      // 지도 타입 변경 컨트롤을 생성한다
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도에 확대 축소 컨트롤을 생성한다
      var zoomControl = new kakao.maps.ZoomControl();

      // 지도의 우측에 확대 축소 컨트롤을 추가한다
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      //===================== 카테고리별 장소 검색 관련 코드 =========================
      //=================================================================================

      // 현재 위치에 마커 표시
      let current = {
        lat: this.curlat,
        lng: this.curlng,
      };
      this.markerParam.arr = [current];
      this.markerParam.txt = "current";
      this.displayMarkers(false);

      // 현재 주변 아파트 표시
      let curloc = {
        curlat: this.curlat,
        curlng: this.curlng,
      };

      await this.getCurHouseList(curloc);

      if (!(this.houses && this.houses.length != 0)) {
        alert("현재 주변 매물 정보가 없습니다. ");
        this.initMap();
      } else {
        this.markerParam.arr = this.houses;
        this.markerParam.txt = "house";
        this.displayMarkers(false);
      }
    },

    //지도에 marker 표시하기
    displayMarkers(flag) {
      // markers 초기화
      if (flag == true) {
        console.log("this.markers :", this.markers);
        this.markerDel(this.markers);
        console.log("this.tempMarkers :", this.tempMarkers);
        this.markerDel(this.tempMarkers);
      } else {
        // 임시 markers에 markers 담아야함
        for (let i = 0; i < this.markers.length; i++) {
          this.tempMarkers.push(this.markers[i]);
        }
      }
      this.markers = [];

      // 파라미터 값 가져오기
      let arr = this.markerParam.arr;
      let txt = this.markerParam.txt;

      for (let i = 0; i < arr.length; i++) {
        let lng = arr[i].lng;
        let lat = arr[i].lat;
        this.markers.push([parseFloat(lat), parseFloat(lng), arr[i].apartmentName]);
      }

      // this.markers안에 들어있는 좌표 정보를 가지고 marker를 for문을 돌려가면 만들어준다.
      // 이때 marker option들을 추가해주고
      // 클릭헀을 때 인포윈도우를 뜰 수 있도록 속성을 추가해준다.

      // 마커 이미지 속성 셋팅
      var imageSrc;
      if (txt == "house") {
        imageSrc = require("@/assets/img/house_marker.png");
      } else if (txt == "school") {
        imageSrc = require("@/assets/img/school_marker.png");
      } else if (txt == "bus") {
        imageSrc = require("@/assets/img/bus_marker.png");
      } else if (txt == "current") {
        imageSrc = require("@/assets/img/current_marker.png");
      } else if (txt == "pick") {
        imageSrc = require("@/assets/img/house_marker2.png");
      }
      var imageSize = new kakao.maps.Size(40, 40);
      var imageOption = { offset: new kakao.maps.Point(13, 37) };

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // let positions = [];
      // for (let i = 0; i < this.markers.length; i++) {
      //   let position = {
      //     latlng: new kakao.maps.LatLng(this.markers[i][0], this.markers[i][1]),
      //     title: this.markers[i][2],
      //   };
      //   positions.push(position);
      // }

      // for (let i = 0; i < positions.length; i++) {
      //   let marker = new kakao.maps.Marker({
      //     map: this.map,
      //     position: positions[i].latlng, // 마커를 표시할 위치
      //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      //     image: markerImage, // 마커 이미지
      //     clickable: true,
      //   });

      //   marker.setMap(this.map);
      //   // var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      //   //   iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      //   // // 인포윈도우를 생성합니다
      //   // var infowindow = new kakao.maps.InfoWindow({
      //   //   content: iwContent,
      //   //   removable: iwRemoveable,
      //   // });

      //   // // 마커에 클릭이벤트를 등록합니다
      //   // kakao.maps.event.addListener(marker2, "click", function () {
      //   //   // 마커 위에 인포윈도우를 표시합니다
      //   //   infowindow.open(this.map, marker2);
      //   // });
      // }

      // let positions = this.markers.map((position) => new kakao.maps.LatLng(...position));
      let positions = this.markers.map((position) => new kakao.maps.LatLng(...position));

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
              image: markerImage,
              clickable: true,
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },

    // 특정 아파트 선택시 해당 위치로 마커 보여주기
    markerPick(house) {
      this.markerParam.arr = this.houses;
      this.markerParam.txt = "house";
      this.displayMarkers(false);
      this.markerParam.arr = [house];
      this.markerParam.txt = "pick";
      this.displayMarkers(false);
    },

    // 마커 초기화(기존 마커들 지우기)
    markerDel(markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
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

    // detail 카드 닫기
    closeDetailCard() {
      let item = document.getElementById("detail_card_content");
      item.style.display = "none";
    },

    // 학교 정보 가져오고 마커 표시하기 => 학교코드, 학교이름, 위도, 경도만 가져옴
    async getSchoolInfo() {
      if (this.houses != undefined) {
        // houses에 값이 있다면, 즉 아파트 목록이 있다면
        // 가장 첫 번쨰로 출력된 아파트 기준으로 위도, 경도 설정 후 반경 내에 있는 학교들을 불러온다.
        let curLoc = {
          lat: this.houses[0].lat,
          lng: this.houses[0].lng,
        };

        await this.getCurSchool(curLoc);
        this.markerParam.arr = this.schools;
        this.markerParam.txt = "school";
        this.displayMarkers(false);
      } else {
        // 검색을 안하거나, 검색결과 아파트 목록이 없다면
        // alert창을 띄우고 현재 위치 기준으로 주변 학교들을 검색해준다.
        let curLoc = {
          lat: this.curlat,
          lng: this.curlng,
        };

        await this.getCurSchool(curLoc);
        this.markerParam.arr = this.schools;
        this.markerParam.txt = "school";
        this.displayMarkers(false);
      }
    },

    // 버스 정보 가져오고 마커 표시하기 => 버스코드, 버스이름, 위도, 경도만 가져옴
    async getBusInfo() {
      if (this.houses != undefined) {
        // houses에 값이 있다면, 즉 아파트 목록이 있다면
        // 가장 첫 번쨰로 출력된 아파트 기준으로 위도, 경도 설정 후 반경 내에 있는 학교들을 불러온다.
        let curLoc = {
          lat: this.houses[0].lat,
          lng: this.houses[0].lng,
        };

        await this.getCurBus(curLoc);
        this.markerParam.arr = this.buses;
        this.markerParam.txt = "bus";
        this.displayMarkers(false);
      } else {
        // 검색을 안하거나, 검색결과 아파트 목록이 없다면
        // alert창을 띄우고 현재 위치 기준으로 주변 학교들을 검색해준다.
        let curLoc = {
          lat: this.curlat,
          lng: this.curlng,
        };

        await this.getCurBus(curLoc);
        this.markerParam.arr = this.buses;
        this.markerParam.txt = "bus";
        this.displayMarkers(false);
      }
    },

    // 인포윈도우 구현하기
    // displayInfoWindow() {
    //   var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //     iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
    //     iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    //   var infowindow = new kakao.maps.InfoWindow({
    //     map: this.map, // 인포윈도우가 표시될 지도
    //     position: iwPosition,
    //     content: iwContent,
    //     removable: iwRemoveable,
    //   });

    //   this.map.setCenter(iwPosition);
    // },

    // 아파트 이름으로 검색하기
    async searchApart() {
      if (this.keyword != "") {
        // 검색 내용이 있다면 함수 호출
        this.CLEAR_HOUSE_LIST(); // 먼저 house 리스트 삭제
        await this.getByKeyword(this.keyword);

        if (!(this.houses && this.houses.length != 0)) {
          alert("매물 정보가 없습니다. ");
          this.initMap();
        }
        // }
      } else {
        alert("검색어를 입력해주세요.");
      }
    },

    //======================== 카테고리별 장소 검색(은행, 마트, 약국, 주유소, 카페, 편의점) start

    //======================== 카테고리별 장소 검색(은행, 마트, 약국, 주유소, 카페, 편의점) end
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
  right: 2px;
  top: 300px;
  z-index: 2;
}
</style>
