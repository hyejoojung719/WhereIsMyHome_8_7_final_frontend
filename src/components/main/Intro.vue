<template>
  <div id="content">
    <div id="subBoxs">
      <div class="displayBox" data-aos="fade-up" data-aos-duration="1000">
        <v-col cols="8" id="subBox1">
          <v-card color="primary" dark width="100%">
            <v-card-title><h3>실거래가를 조회해보세요.</h3> </v-card-title>
            <v-card-subtitle class="pt-5"
              ><p>
                2015년부터 2022년까지 거래된 금액을 쉽게 파악하고,
                <br />
                쉽게 아파트 위치와 주변 인프라도 함께 조회해 보세요.
                <br />
                당신과 가족을 위해 통계를 기반으로 현명한 선택을 할 수 있습니다.
              </p>
            </v-card-subtitle>
            <v-card-actions>
              <router-link :to="{ name: 'apartList' }"><v-btn text>실거래가 조회 </v-btn></router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </div>
      <div class="displayBox" data-aos="fade-up" data-aos-duration="1100">
        <v-col cols="8" id="subBox2">
          <v-card color="secondary" dark width="100%">
            <v-card-title> <h3>최신 부동산 뉴스를 볼 수 있습니다.</h3></v-card-title>
            <v-card-subtitle class="pt-5">매일 업데이트 되는 부동산 뉴스들을 만나보세요.</v-card-subtitle>
            <v-card-actions>
              <v-btn text> 부동산 뉴스 </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </div>
      <div class="displayBox" data-aos="fade-up" data-aos-duration="1200">
        <v-col cols="8" id="subBox3">
          <v-card color="primary" dark width="100%">
            <v-card-title> <h3>관심있는 아파트는 콕! 찜해두세요.</h3></v-card-title>
            <v-card-subtitle class="pt-5">
              관심 있는 매물은 저장해두고, 한 눈에 볼 수 있습니다. <br />
              손 쉽게 아파트를 찜해보세요.
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text @click="toMyHouse"> 관심 아파트 조회 </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </div>
    </div>
    <div class="displayBox" data-aos="fade-up" data-aos-duration="1200">
      <div id="content_img">
        <v-img lazy-src="https://picsum.photos/id/11/10/6" src="@/assets/img/main_img1.png"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    toMyHouse() {
      if (!this.userInfo.user_id) {
        alert("로그인 후 이용해주세요.");
      } else {
        this.$router.push({ name: "myhouse" });
      }
    },
  },
};
</script>

<style scoped>
#content {
  background-color: white;
  width: 1200px;
  height: 900px;
  position: relative;
}

#subBoxs {
  position: absolute;
  top: 200px;
  left: 300px;
  width: 800px;
}

#content_img {
  position: absolute;
  left: 80%;
  /* transform: translateX(-10%); */
  width: 700px;
  height: 600px;
  top: 300px;
  text-align: center;
}
</style>
