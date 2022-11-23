<template>
  <v-sheet min-height="30vh" rounded="lg" elevation="4">
    <v-col style="height: 30vh; align-items: center; flex-direction: column" class="d-flex">
      <v-row>
        <v-icon class="mx-auto" x-large style="font-size: 100px"> mdi-account-circle </v-icon>
      </v-row>
      <v-row><h3>회원 정보를 삭제하겠습니까?</h3> </v-row>
      <v-banner single-line>공지사항 쓴 글과 관심 아파트 목록 또한 같이 삭제됩니다.</v-banner>
      <v-row class="my-2"
        ><v-btn color="primary" class="white--text" large @click="deleteUserInfo">삭제</v-btn
        ><v-btn large color="secondary" @click="cancel">취소</v-btn></v-row
      >
    </v-col>
  </v-sheet>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$router.push({ name: "mypage" });
    },
    async deleteUserInfo() {
      let response = await this.$store.dispatch("userStore/deleteUserInfo");
      if (response) {
        alert("삭제 성공");
        this.$router.replace({ name: "main" });
      }
    },
  },
};
</script>
<style scoped>
.row {
  padding: 8px 0;
  margin: 0;
}

.col {
  padding: 0;
}

strong {
  color: red;
}

::v-deep .v-btn {
  margin: 0 6px;
}

::v-deep .v-banner__wrapper {
  padding: 8px;
}
</style>
