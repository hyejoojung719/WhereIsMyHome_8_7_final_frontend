<template>
  <v-footer padless>
    <v-card
      tile
      flat
      color="red accent-2"
      width="100%"
      height="120px"
      absolute
      class="d-flex align-center justify-center"
    >
      <v-row class="pl-3">
        <v-btn v-for="link in links" :key="link" text class="my-2">{{
          link
        }}</v-btn>

        <v-col class="primary py-4" cols="12">
          <v-row> 이나연 GIT 주소 | 정혜주 GIT 주소 </v-row>
          <v-row> 대전광역시 유성구 덕명동 124 | 042-820-7400 </v-row>
          <v-row> Copyright &copy;SSAFY_CarrotCheezeCake</v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      links: ["고객센터", "이용약관", "개인정보 처리방침"],
    };
  },
};
</script>

<style></style>
