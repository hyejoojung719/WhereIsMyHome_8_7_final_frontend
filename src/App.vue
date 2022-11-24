<template>
  <v-app style="padding-top: 48px">
    <NavView />
    <router-view />
    <FooterView />
  </v-app>
</template>

<script>
import NavView from "@/components/common/NavView.vue";
import FooterView from "@/components/common/FooterView.vue";

export default {
  components: {
    NavView,
    FooterView,
  },
};
</script>
<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}
::v-deep .v-text-field__details {
  min-height: 0px;
}
::v-deep .v-messages {
  min-height: 0px;
}
.v-application {
  font-family: "NanumSquareRound", sans-serif !important;
}
@font-face {
  font-family: "NanumSquareRound";
  src: url("assets/fonts/NanumSquareRoundOTFR.otf") format("opentype");
  font-weight: 400;
}
@font-face {
  font-family: "NanumSquareRound";
  src: url("assets/fonts/NanumSquareRoundOTFL.otf") format("opentype");
  font-weight: 300;
}
@font-face {
  font-family: "NanumSquareRound";
  src: url("assets/fonts/NanumSquareRoundOTFB.otf") format("opentype");
  font-weight: 700;
}
@font-face {
  font-family: "NanumSquareRound";
  src: url("assets/fonts/NanumSquareRoundOTFEB.otf ") format("opentype");
  font-weight: 700;
}
</style>
