<template>
  <v-app>
    <NavView />
    <router-view />
  </v-app>
</template>

<script>
import NavView from "@/components/common/NavView.vue";
export default {
  components: {
    NavView,
  },
};
</script>
<style scoped>
::v-deep .v-application--wrap {
  min-height: fit-content;
}
</style>
