<template>
  <v-container fluid class="pa-0">
    <v-sheet min-height="40vh" rounded="lg" elevation="4">
      <v-col style="height: 40vh; align-items: center; flex-direction: column" class="d-flex">
        <v-row>
          <v-icon class="mx-auto" x-large style="font-size: 100px"> mdi-account-circle </v-icon>
        </v-row>
        <v-row style="width: 40vw; justify-content: center">
          <v-form ref="form" style="width: 60%">
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
              <v-btn class="primary mx-auto" block @click="updateUserInfo">회원정보 수정</v-btn>
            </v-row>
          </v-form>
        </v-row>
      </v-col>
    </v-sheet>
    <v-spacer></v-spacer>
    <v-sheet min-height="22vh" rounded="lg" class="my-4" elevation="4">
      <v-col style="height: 22vh; justify-content: center" class="d-flex">
        <v-form ref="pass" style="width: 35%">
          <v-row>
            <v-col cols="4" align-self="center"
              ><label>비밀번호<strong>*</strong></label></v-col
            >
            <v-col cols="8">
              <v-text-field
                v-model="user_password"
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
          <v-row class="mx-10">
            <v-btn class="primary mx-auto" block @click="updatePassword">비밀번호 수정</v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: {},
      user_password: "",
      passwordRules2: [],
      today: new Date().toISOString().substr(0, 10),
      menu: false,
    };
  },
  computed: {
    ...mapState("ruleStore", ["emailRules", "passwordRules", "nameRules", "birthRules"]),
  },
  async created() {
    this.passwordRules2 = [
      ...this.passwordRules,
      (v) => (v && v === this.user_password) || "패스워드가 일치하지 않습니다.",
    ];

    let response = await this.$store.dispatch("userStore/getUserInfo");
    if (!response) {
      alert("유저 정보 없음");
    } else {
      this.userInfo = response;
    }
  },
  methods: {
    date_search(v) {
      this.userInfo.user_birth = v;
      this.menu = false;
      this.$refs.birthmenu.save(v);
    },
    async updateUserInfo() {
      this.$refs.form.validate();
      let response = await this.$store.dispatch("userStore/updateUserInfo", this.userInfo);
      if (response) {
        this.$router.push({ name: "mypage" });
      } else {
        alert("수정 실패");
      }
    },

    async updatePassword() {
      this.$refs.pass.validate();
      let passInfo = { user_id: this.userInfo.user_id, user_password: this.user_password };
      let response = await this.$store.dispatch("userStore/updatePassword", passInfo);
      if (response) {
        this.$refs.pass.reset();
        alert("비밀번호 수정 성공");
      } else {
        alert("비밀번호 수정 실패");
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
