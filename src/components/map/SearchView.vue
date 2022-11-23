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
        <v-card class="apartinfo mx-auto" v-if="houses && houses.length != 0" min-width="300" min-height="800">
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
        <v-card v-else class="apartinfo mx-auto" min-width="300" min-height="800">
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
          min-width="350"
          min-height="800"
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
      <div id="map">
        <div id="infra">
          <v-card elevation="5" width="50">
            <ul id="category" ref="category">
              <li id="BK9" data-order="0" @click="onClickCategory(0)">
                <span><v-img src="@/assets/img/bank_icon.png"></v-img></span>
                은행
              </li>
              <li id="MT1" data-order="1" @click="onClickCategory(1)">
                <span><v-img src="@/assets/img/mart_icon.png"></v-img></span>
                마트
              </li>
              <li id="PM9" data-order="2" @click="onClickCategory(2)">
                <span><v-img src="@/assets/img/pharmacy_icon.png"></v-img></span>
                약국
              </li>
              <li id="OL7" data-order="3" @click="onClickCategory(3)">
                <span><v-img src="@/assets/img/gas_icon.png"></v-img></span>
                주유소
              </li>
              <li id="CE7" data-order="4" @click="onClickCategory(4)">
                <span><v-img src="@/assets/img/cafe_icon.png"></v-img></span>
                카페
              </li>
              <li id="CS2" data-order="5" @click="onClickCategory(5)">
                <span><v-img src="@/assets/img/store_icon.png"></v-img></span>
                편의점
              </li>
            </ul>
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
      console.log("mounted");
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
      sido: null,
      gugun: null,
      dong: null,
      markers: [],
      tempMarkers: [],
      curlat: 36.355600828062805,
      curlng: 127.29918461338437,
      markerParam: {
        arr: [], // 마커 표시할 위치 담은 배열
        txt: "", // 표시할 이미지 다르게 하기위한 마커 이름 house, housepick, school, current, bus, hospital...
      },
      keyword: "",
      house: null, // 리스트에서 선택한 house
      // 카테고리 검색 관련 변수
      inframarkers: [],
      placeOverlay: null,
      contentNode: null,
      currCategory: "",
      ps: null,
    };
  },
  computed: {
    ...mapState("mapStore", ["sidos", "guguns", "dongs", "houses", "schools", "buses", "myHouses"]),
  },
  async created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_SCHOOL_LIST();
    this.CLEAR_BUS_LIST();
    this.getSido(); // 시도 정보 가져오기

    // 관심 아파트 목록 가져오기
    this.getMyApart("ssafy@ssafy.com");
    console.log("내가 찜한 집 : ", this.myHouses);
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
      "insertMyApart",
      "getMyApart",
    ]),
    ...mapMutations("mapStore", [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_SCHOOL_LIST",
      "CLEAR_BUS_LIST",
      "CLEAR_MYHOUSE_LIST",
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
          // this.initMap();
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

        //위도 :  35.907757
        //경도 :  127.766922
      } catch (error) {
        alert("현재 위치를 표시할 수 없습니다. ");
      }
    },

    // 지도 표시
    async initMap() {
      console.log("initMap() 호출");
      // 현재 위치 기준으로 표시
      // await this.currentLoc();

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

      //===================== 카테고리별 장소 검색 관련 코드 =========================
      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.contentNode = document.createElement("div");
      this.currCategory = "";
      this.ps = new kakao.maps.services.Places(this.map);

      kakao.maps.event.addListener(this.map, "idle2", this.searchPlaces());

      this.contentNode.className = "placeinfo_wrap";

      this.addEventHandle(this.contentNode, "mousedown", kakao.maps.event.preventMap);
      this.addEventHandle(this.contentNode, "touchstart", kakao.maps.event.preventMap);

      this.placeOverlay.setContent(this.contentNode);

      // 각 카테고리에 클릭 이벤트를 등록합니다
      // this.addCategoryClickEvent();
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
        this.markerDel(this.markers);
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
        this.markers.push([parseFloat(lat), parseFloat(lng), arr[i].apartmentName, arr[i]]);
      }

      if (txt == "current") this.markers[0][2] = "나예요";

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
      // display 상태 설정======================================
      let item = document.getElementById("detail_card_content");
      item.style.display = "block";

      // house 정보 가져오기 ===================================
      let lat = house.lat;
      let lng = house.lng;
      let apartmentName = house.apartmentName;
      // let aptCode = house.aptCode;

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

    //==================================== 아파트 찜하기 기능
    // 아파트 찜 버튼 눌렀을 때
    async addMyHouse() {
      await this.insertMyApart(this.house);
      // 관심 아파트 목록 가져오기 => 버튼 누를 때마다 갱신 해준다.
      this.getMyApart("ssafy@ssafy.com");

      if (document.getElementById("emptyHeart").style.display == "none") {
        document.getElementById("emptyHeart").style.display = "block";
        document.getElementById("fullHeart").style.display = "none";
      } else {
        document.getElementById("emptyHeart").style.display = "none";
        document.getElementById("fullHeart").style.display = "block";
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

    //======================== 카테고리별 장소 검색(은행, 마트, 약국, 주유소, 카페, 편의점) start
    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    addEventHandle(target, type, callback) {
      console.log("addEventHandle() 호출");
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    onClickCategory(el) {
      console.log("onClickCategory() 호출");

      let tag = this.$refs.category.children[el];

      var id = tag.id,
        className = tag.className;

      this.placeOverlay.setMap(null);

      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeMarker();
      } else {
        this.currCategory = id;
        this.changeCategoryClass(tag);
        this.searchPlaces();
      }
    },

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    changeCategoryClass(el) {
      console.log("changeCategoryClass() 호출");

      var category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      console.log("removeMarker() 호출");
      for (var i = 0; i < this.inframarkers.length; i++) {
        this.inframarkers[i].setMap(null);
      }
      this.inframarkers = [];
    },

    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      console.log("searchPlaces() 호출");
      if (!this.currCategory) {
        return;
      }

      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, { useMapBounds: true });
    },

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status) {
      console.log("placesSearchCB() 호출");

      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },

    // 지도에 마커를 표출하는 함수입니다
    displayPlaces(places) {
      console.log("displayPlaces() 호출");

      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document.getElementById(this.currCategory).getAttribute("data-order");

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let inframarker = this.addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다

        // console.log("")
        // this.displayPlaceInfo(places[i])
        kakao.maps.event.addListener(inframarker, "click", () => console.log("places 출력2 ", places[i]));

        // (function (inframarker, place) {
        //   kakao.maps.event.addListener(inframarker, "click", function () {
        //     console.log(place);
        //     // this.displayPlaceInfo(place);
        //   });
        // })(inframarker, places[i]);
      }
    },

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, order) {
      console.log("addMarker() 호출");

      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.inframarkers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    displayPlaceInfo(place) {
      console.log("displayPlaceInfo() 호출");

      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
      }

      content += '    <span class="tel">' + place.phone + "</span>" + "</div>" + '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },
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
  height: 800px;
  position: relative;
  z-index: 1;
}
.apartinfo {
  height: 800px;
  overflow-y: auto;
}

#infra {
  position: absolute;
  right: 15px;
  top: 250px;
  z-index: 2;
}

/* 카테고리 */
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
  padding-left: 0;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 2px 0;
  margin: 2px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png) no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px
    center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
