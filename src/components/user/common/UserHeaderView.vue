<template>
  <v-container class="py-10">
    <v-row class="px-2">
      <h1>
        <v-icon x-large> mdi-account-circle </v-icon>
        {{ userInfo.user_name }}님 안녕하세요!
      </h1>
    </v-row>
    <v-row>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
};
</script>

<style>
.row {
  margin: 0px;
}
</style>
