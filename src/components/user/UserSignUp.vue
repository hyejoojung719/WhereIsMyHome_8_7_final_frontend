<template>
  <v-container class="d-flex mx-auto pa-0" style="height: 90vh">
    <v-col class="ma-auto pa-0" cols="4" no-gutters>
      <v-form ref="form">
        <v-row> <h1 class="mx-auto my-10">회원가입</h1> </v-row>
        <v-row class="py-6">
          <v-divider color="black"></v-divider>
        </v-row>
        <v-row>
          <v-col cols="4" align-self="center"
            ><label>이메일<strong>*</strong></label></v-col
          >
          <v-col cols="8">
            <v-text-field
              v-model="userInfo.user_id"
              placeholder="이메일 주소"
              light
              outlined
              color="#AA8B56"
              hide-details="auto"
              :rules="[...emailRules, emailValid]"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" align-self="center"
            ><label>비밀번호<strong>*</strong></label></v-col
          >
          <v-col cols="8">
            <v-text-field
              v-model="userInfo.user_password"
              placeholder="영문, 숫자 조합 8글자 이상"
              light
              outlined
              color="#AA8B56"
              hide-details="auto"
              type="password"
              :rules="passwordRules"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" align-self="center"
            ><label>비밀번호 확인<strong>*</strong></label></v-col
          >
          <v-col cols="8">
            <v-text-field
              placeholder="비밀번호를 한번 더 입력해주세요."
              light
              outlined
              color="#AA8B56"
              hide-details="auto"
              type="password"
              :rules="passwordRules2"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" align-self="center"
            ><label>이름<strong>*</strong></label></v-col
          >
          <v-col cols="8">
            <v-text-field
              v-model="userInfo.user_name"
              placeholder="이름을 입력해주세요."
              light
              outlined
              color="#AA8B56"
              hide-details="auto"
              :rules="nameRules"
              class="rounded-lg"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" align-self="center"
            ><label>생년월일<strong>*</strong></label></v-col
          >
          <v-col cols="8">
            <v-menu
              ref="birthmenu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="userInfo.user_birth"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userInfo.user_birth"
                  placeholder="생년월일을 입력해주세요."
                  light
                  outlined
                  color="#AA8B56"
                  hide-details="auto"
                  :rules="birthRules"
                  class="rounded-lg"
                  append-icon="mdi-calendar-today"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="userInfo.user_birth" scrollable :max="today">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="date_search(userInfo.user_birth)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="my-2 mx-10">
          <v-btn class="primary mx-auto" block @click="regist">가입하기</v-btn>
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
      passwordRules2: [],
      emailValid: true,
      today: new Date().toISOString().substr(0, 10),
      birth: new Date().toISOString().substr(0, 10),
      menu: false,
    };
  },
  computed: {
    ...mapState("ruleStore", ["emailRules", "passwordRules", "nameRules", "birthRules"]),
    email() {
      return this.userInfo.user_id;
    },
  },
  created() {
    this.passwordRules2 = [
      ...this.passwordRules,
      (v) => (v && v === this.userInfo["user_password"]) || "패스워드가 일치하지 않습니다.",
    ];
  },
  watch: {
    async email() {
      let response = await this.$store.dispatch("userStore/idCheck", {
        user_id: this.email,
      });
      this.emailValid = response == 1 ? "중복된 아이디가 존재합니다." : true;
    },
  },
  methods: {
    date_search(v) {
      this.userInfo.user_birth = v;
      this.menu = false;
      this.$refs.birthmenu.save(v);
    },
    async regist() {
      this.$refs.form.validate();
      let response = await this.$store.dispatch("userStore/regist", this.userInfo);
      if (response) {
        this.$router.replace({ name: "userSignIn" });
      } else {
        alert("등록 실패");
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
</style>
