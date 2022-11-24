v
<template>
  <v-container class="d-flex mx-auto pa-0" style="height: 90vh">
    <v-col class="ma-auto pa-0" cols="4" no-gutters>
      <v-form ref="form">
        <v-row> <h1 class="mx-auto my-4">비밀번호 찾기</h1> </v-row>
        <v-row style="justify-content: center">가입 시 등록한 이메일을 입력해주세요. </v-row>
        <v-row style="justify-content: center" class="py-0">임시 비밀번호가 발급 됩니다. </v-row>
        <v-row class="py-4">
          <v-divider color="black"></v-divider>
        </v-row>
        <v-row>
          <v-col cols="4" align-self="center"><label>이메일</label></v-col>
          <v-col cols="8">
            <v-text-field
              v-model="userInfo.user_id"
              placeholder="이메일 주소"
              light
              outlined
              color="#AA8B56"
              hide-details="auto"
              :rules="[...emailRules]"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-6 mx-10">
          <v-btn class="primary mx-auto" block @click="sendEmail">인증 메일 보내기</v-btn>
        </v-row>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState("ruleStore", ["emailRules"]),
  },

  methods: {
    async sendEmail() {
      console.log(this.userInfo);
      let response = await this.$store.dispatch("userStore/sendEmail", this.userInfo);
      alert(response);
      this.$router.push({ name: "userSignIn" });
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
</style>
