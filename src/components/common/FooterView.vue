<template>
  <v-footer padless>
    <v-card fixed tile flat width="100%" height="120px" class="d-flex align-center justify-center">
      <v-row class="pl-3" height="100%" no-gutters>
        <v-col class="pa-0" cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col class="px-3 py-0" cols="12">
          <v-btn v-for="link in links" :key="link" text class="my-2">{{ link }}</v-btn>
        </v-col>
        <v-col class="py-2 body-2 grey--text text--darken-1" cols="12">
          <v-row class="px-7"> 이나연 GIT 주소 | 정혜주 GIT 주소 </v-row>
          <v-row class="px-7"> 대전광역시 유성구 덕명동 124 | 042-820-7400 </v-row>
          <v-row class="px-7"> Copyright &copy;SSAFY_CarrotCheezeCake</v-row>
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

<style scoped></style>
