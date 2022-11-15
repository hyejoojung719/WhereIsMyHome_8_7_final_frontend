<template>
  <v-app>
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
</style>
