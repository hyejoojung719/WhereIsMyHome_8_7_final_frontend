<template>
  <div id="app">
    <div id="app" class="d-flex justify-content-start">
      <v-app id="searchlist">
        <v-card class="apartinfo mx-auto" v-if="myHouses && myHouses.length != 0" min-width="300" min-height="700">
          <v-list>
            <v-list-item-group color="secondary">
              <!-- @click="ddd(house)" -->
              <v-list-item v-for="(house, i) in myHouses" :key="i">
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
        <!-- 관심 매물이 없을 때 띄울 창 -->
        <v-card v-else class="apartinfo mx-auto" min-width="300" min-height="700"> </v-card>
      </v-app>
      <v-app id="detail_card">
        <v-card
          class="apartinfo mx-auto"
          min-width="350"
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
            <div class="text-right" style="display: block" id="emptyHeart">
              <v-btn icon id="myHouseBtn" @click="addMyHouse"
                ><font-awesome-icon icon="fa-regular fa-heart" class="fa-xl" style="color: red" />
              </v-btn>
            </div>
            <div class="text-right" style="display: none" id="fullHeart">
              <v-btn icon id="myHouseBtn" @click="addMyHouse"
                ><font-awesome-icon icon="fa-solid fa-heart" class="fa-xl" style="color: red" />
              </v-btn>
            </div>
            <div class="m-0 text-subtitle-1">주소</div>
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
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9f2f61f8fb619932f1da3bd45427cbcd&libraries=services";
      document.head.appendChild(script);
    }
  },
  //36.366701,
  //127.344307,
  data() {
    return {
      markers: [],
      tempMarkers: [],
      curlat: 36.355600828062805,
      curlng: 127.29918461338437,
      markerParam: {
        arr: [], // 마커 표시할 위치 담은 배열
        txt: "", // 표시할 이미지 다르게 하기위한 마커 이름 house, housepick, school, current, bus, hospital...
      },
      house: null, // 리스트에서 선택한 house
    };
  },
  computed: {
    ...mapState("mapStore", ["houses", "myHouses"]),
  },
  async created() {
    this.CLEAR_HOUSE_LIST();

    // 관심 아파트 목록 가져오기
    this.getMyApart("ssafy@ssafy.com");
    console.log("내가 찜한 집 : ", this.myHouses);
  },
  methods: {
    ...mapActions("mapStore", ["getHouseList", "insertMyApart", "getMyApart"]),
    ...mapMutations("mapStore", ["CLEAR_HOUSE_LIST", "CLEAR_MYHOUSE_LIST"]),

    // 지도 표시
    async initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.curlat, this.curlng),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      // 지도 타입 변경
      var mapTypeControl = new kakao.maps.MapTypeControl();

      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      var zoomControl = new kakao.maps.ZoomControl();

      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 관심 매물들 마커 표시
      if (this.myHouses.length != 0) {
        this.markerParam.arr = this.myHouses;
        this.markerParam.txt = "house";
        this.displayMarkers();
      } else {
        alert("현재 관심 매물이 없습니다.");
      }
    },

    //지도에 marker 표시하기
    displayMarkers() {
      this.markers = [];

      // 파라미터 값 가져오기
      let arr = this.markerParam.arr;
      let txt = this.markerParam.txt;

      for (let i = 0; i < arr.length; i++) {
        let lng = arr[i].lng;
        let lat = arr[i].lat;
        this.markers.push([parseFloat(lat), parseFloat(lng), arr[i].apartmentName, arr[i]]);
      }

      console.log("markers 정 보 : ", this.markers);
      // 마커 이미지 속성 셋팅
      var imageSrc;
      if (txt == "house") {
        imageSrc = require("@/assets/img/house_marker.png");
      } else if (txt == "pick") {
        imageSrc = require("@/assets/img/house_marker2.png");
      }
      var imageSize = new kakao.maps.Size(40, 40);
      var imageOption = { offset: new kakao.maps.Point(13, 37) };

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      // ===========================================================

      let positions = [];
      for (let i = 0; i < this.markers.length; i++) {
        positions.push({
          latlng: new kakao.maps.LatLng(this.markers[i][0], this.markers[i][1]),
          title: this.markers[i][2],
          obj: this.markers[i][3],
        });
      }

      let temp = [];
      var bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < positions.length; i++) {
        let marker = new kakao.maps.Marker({
          map: this.map,
          position: positions[i].latlng,
          image: markerImage,
          title: positions[i].title,
          clickable: true,
        });
        temp.push(marker);
        marker.setMap(this.map);
        bounds.extend(positions[i].latlng);

        // 인포 윈도우 ================================================
        let iwContent = '<div style="padding:5px;">' + positions[i].title + "</div>",
          iwRemoveable = true;

        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        kakao.maps.event.addListener(marker, "mouseover", () => this.infowindowFunction(infowindow, this.map, marker));
        kakao.maps.event.addListener(marker, "mouseout", () => infowindow.close());
        // 클릭하면 detail card 열기 =============================================
        kakao.maps.event.addListener(marker, "click", () => this.makeDetailCard(positions[i].obj));
      }

      if (positions.length > 0) {
        this.markers = temp.map((el) => el);
      }

      this.map.setBounds(bounds);
    },

    infowindowFunction(infowindow, map, marker) {
      infowindow.open(map, marker);
    },

    // 특정 아파트 선택시 해당 위치로 마커 보여주기
    markerPick(house) {
      this.markerParam.arr = this.myHouses;
      this.markerParam.txt = "house";
      this.displayMarkers();
      this.markerParam.arr = [house];
      this.markerParam.txt = "pick";
      this.displayMarkers();
    },

    // 상세정보 카드 만들기
    makeDetailCard(house) {
      // display 상태 설정======================================
      let item = document.getElementById("detail_card_content");
      item.style.display = "block";

      // house 정보 가져오기 ===================================
      let lat = house.lat;
      let lng = house.lng;
      let apartmentName = house.apartmentName;

      // house값 셋팅 => 하트 누르면 해당 house 값이 매개변수로 넘어감============
      this.house = house;

      // detail card 정보 셋팅=============================================
      document.getElementById("apartmentName").innerHTML = apartmentName;

      // heart 상태================================================================
      this.heartStatus();

      // 해당 위치로 마커 이동==================================================
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
        if (panoId == null) {
          alert("로드뷰가 뜨지 않는 건물");
          let imgsrc = require("@/assets/img/xbox_img.jpg");
          document.getElementById(
            "roadview"
          ).innerHTML = `<img src=${imgsrc} alt="My Image" style="width:350px; height:100%">`;
        } else {
          roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
        }
      });
    },

    // detail 카드 닫기
    closeDetailCard() {
      let item = document.getElementById("detail_card_content");
      item.style.display = "none";
    },

    //==================================== 아파트 찜하기 기능
    // 아파트 찜 버튼 눌렀을 때
    async addMyHouse() {
      await this.insertMyApart(this.house);

      // 관심 아파트 목록 가져오기 => 버튼 누를 때마다 갱신 해준다.
      this.getMyApart("ssafy@ssafy.com");
      console.log("찜버튼 누르고 : ", this.myHouses);
      console.log(document.getElementById("fullHeart").style.display);

      if (document.getElementById("fullHeart").style.display == "block") {
        console.log("들어온다.");
        document.getElementById("emptyHeart").style.display = "none";
        document.getElementById("fullHeart").style.display = "block";
        // 관심 매물들 마커 표시
        this.markerParam.arr = this.myHouses;
        this.markerParam.txt = "house";
        this.displayMarkers();
      }
    },

    // 하트 상태 체크
    heartStatus() {
      let flag = false;

      for (let i = 0; i < this.myHouses.length; i++) {
        if (this.myHouses[i].aptCode == this.house.aptCode) {
          flag = true;
        }
      }

      if (flag) {
        // 찜목록에 있다면 => 하트를 꽉 찬 하트로
        document.getElementById("emptyHeart").style.display = "none";
        document.getElementById("fullHeart").style.display = "block";
      } else {
        // 없다면 빈 하트로
        document.getElementById("emptyHeart").style.display = "block";
        document.getElementById("fullHeart").style.display = "none";
      }
    },

    //===========================================
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
  right: 15px;
  top: 250px;
  z-index: 2;
}
</style>
