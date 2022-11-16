<template>
  <v-container fluid class="pa-0 ma-0" style="max-height: 800px">
    <v-row class="relative ma-0" style="height: 100%" no-gutters>
      <v-col class="white" style="height: 100%" cols="4"> </v-col>
      <v-col class="white" style="height: 100%" cols="8"
        ><v-img src="@/assets/img/background1.jpg" style="height: 100%"></v-img
      ></v-col>
      <v-card
        class="absolute rounded-xl"
        elevation="6"
        outlined
        style="width: 500px; height: 650px"
      >
        <v-form text-align>
          <v-col class="pa-10">
            <v-row style="height: 20px"> </v-row>
            <v-row
              ><v-img class="logo" src="@/assets/img/logo1.png"></v-img
            ></v-row>
            <v-row
              ><v-text-field
                v-model="signinInfo.user_id"
                label="이메일"
                light
                outlined
                color="#AA8B56"
                clearable
                hide-details="auto"
                :rules="emailRules"
              ></v-text-field>
            </v-row>
            <v-row
              ><v-text-field
                v-model="signinInfo.user_password"
                label="비밀번호"
                outlined
                color="#AA8B56"
                clearable
                hide-details="auto"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="switchType"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox
                v-model="checkbox"
                class="ma-0"
                label="이메일 저장"
              ></v-checkbox>
            </v-row>
            <v-row>
              <v-btn class="white--text" block color="primary"> 로그인 </v-btn>
            </v-row>
            <v-row>
              <v-btn block class="yellow"> 카카오 로그인</v-btn>
            </v-row>
            <v-row class="text-center">
              <v-btn class="btns" text>이메일 찾기</v-btn> |
              <v-btn class="btns" text>비밀번호 찾기</v-btn> |
              <v-btn class="btns" text>회원가입</v-btn>
            </v-row>
          </v-col>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      checkbox: true,
      passwordShow: false,
      emailRules: [
        (v) => !!v || "이메일을 입력하세요.",
        (v) => /.+@.+/.test(v) || "올바르지 않은 이메일입니다.",
      ],
      passwordRules: [
        (v) => !!v || "비밀번호를 입력하세요.",
        (v) => v.length() <= 15 || "비밀번호는 8자 이상 15자 이하입니다.",
      ],
      signinInfo: {},
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    async signin() {
      try {
        await this.$store.dispatch("userStore/signIn", this.signinInfo);
        alert("로그인 성공");
      } catch (error) {
        alert("로그인 실패");
      }
    },
    switchType() {
      this.passwordShow = !this.passwordShow;
    },
  },
};
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  top: 100px;
  left: 200px;
}
.row {
  margin: 10px;
}
.logo {
  margin: auto;
  display: block;
  width: auto;
  height: auto;
  max-width: 300px;
  max-height: 200px;
}

.btns {
  margin: 0 auto;
}
</style>
