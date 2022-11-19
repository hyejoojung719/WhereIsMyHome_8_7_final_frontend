<template>
  <v-app-bar color="primary accent-4" dense dark>
    <router-link :to="{ name: 'main' }"
      ><v-img src="@/assets/img/logo2.png" width="90px" class="ml-5"></v-img
    ></router-link>

    <v-spacer></v-spacer>
    <router-link :to="{ name: 'map' }">
      <span class="white--text px-5">실거래가 조회</span>
    </router-link>
    <router-link :to="{ name: 'home' }">
      <span class="white--text px-5">부동산 뉴스</span>
    </router-link>
    <router-link :to="{ name: 'userSignIn' }" v-if="!!!userInfo.id">
      <span class="white--text px-5">로그인</span>
    </router-link>
    <template v-else>
      <router-link :to="{ name: 'userMyPage', params: { user_id: userInfo.id } }">
        <span class="white--text px-5">마이페이지</span>
      </router-link>
      <v-btn class="white--text px-5" href="#" @click.prevent="signout" style="font-size: 16px" text>로그아웃</v-btn>
      <!-- <li class="nav-item">
        <span>{{ userInfo.id }}님 환영합니다.</span>
      </li> -->
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    async signout() {
      await this.$store.dispatch("userStore/signOut");
      this.$router.replace({ name: "main" }).catch(() => {}); //홈 화면 이동
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
