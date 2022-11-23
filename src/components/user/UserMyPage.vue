<template>
  <v-sheet min-height="70vh" rounded="lg" elevation="4">
    <v-col class="d-flex" style="height: 70vh; flex-direction: column">
      <v-row>
        <v-icon class="mx-auto" x-large style="font-size: 250px"> mdi-account-circle </v-icon>
      </v-row>
      <v-row>
        <v-list two-line class="mx-auto" style="width: 60vh">
          <v-list-item>
            <v-list-item-icon>
              <v-icon :color="isMember ? 'primary' : 'secondary'"> mdi-email </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">이메일</v-list-item-title>
              <v-list-item-subtitle>{{ userInfo.user_id }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon :color="isMember ? 'primary' : 'secondary'"> mdi-account-box </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">이름</v-list-item-title>
              <v-list-item-subtitle>{{ userInfo.user_name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon :color="isMember ? 'primary' : 'secondary'"> mdi-cake-variant-outline </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">생년월일</v-list-item-title>
              <v-list-item-subtitle>{{ userInfo.user_birth }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
    </v-col>
  </v-sheet>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: {},
      isMember: true,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  async created() {
    let response = await this.$store.dispatch("userStore/getUserInfo");
    if (!response) {
      alert("유저 정보 없음");
    } else {
      this.user = response;
      this.user["user_birth"] = this.user["user_birth"].replace(/(\d{4})-(\d{2})-(\d{2})/, "$1년 $2월 $3일");
    }
    this.isMember = this.userInfo.user_role === "MEMBER" ? true : false;
  },
};
</script>

<style scoped>
::deep .v-icon {
  font-size: 90px;
}
</style>
