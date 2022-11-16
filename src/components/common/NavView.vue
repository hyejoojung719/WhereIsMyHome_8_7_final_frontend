<template>
  <v-app-bar color="primary accent-4" dense dark>
    <router-link :to="{ name: 'main' }"
      ><v-img src="@/assets/img/logo2.png" width="90px" class="ml-5"></v-img
    ></router-link>

    <v-spacer></v-spacer>
    <router-link :to="{ name: 'map' }"> <span class="white--text px-5">실거래가 조회</span> </router-link>
    <router-link :to="{ name: 'home' }"> <span class="white--text px-5">부동산 뉴스</span> </router-link>
    <router-link :to="{ name: 'home' }"> <span class="white--text px-5">로그인</span> </router-link>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
a:hover {
  text-decoration: none !important;
}
</style>
