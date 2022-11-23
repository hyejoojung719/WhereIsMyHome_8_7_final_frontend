<template>
  <v-container fluid class="pa-0 ma-0" style="max-height: 90vh">
    <v-row class="relative ma-0" style="height: 100%" no-gutters>
      <v-col class="white" style="height: 100%" cols="4"> </v-col>
      <v-col class="white" style="height: 100%" cols="8"
        ><v-img src="@/assets/img/background2.jpg" style="height: 100%"></v-img
      ></v-col>
      <v-card class="absolute rounded-xl" elevation="6" outlined style="width: 500px; height: 650px">
        <v-form ref="form" text-align>
          <v-col class="pa-10">
            <v-row style="height: 20px"> </v-row>
            <v-row><v-img class="logo" src="@/assets/img/logo1.png"></v-img></v-row>
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
                hide-details
                :rules="passwordRules"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="switchType"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="checkbox" class="ma-0" label="이메일 저장"></v-checkbox>
            </v-row>
            <v-row>
              <v-btn class="white--text" block color="primary" @click="signin"> 로그인 </v-btn>
            </v-row>
            <v-row>
              <v-btn block class="yellow"> 카카오 로그인</v-btn>
            </v-row>
            <v-row class="text-center">
              <v-btn class="btns" text :to="{ name: 'userFindID' }">이메일 찾기</v-btn> |
              <v-btn class="btns" text>비밀번호 찾기</v-btn> |
              <v-btn class="btns" text :to="{ name: 'userSignUp' }">회원가입</v-btn>
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
  created() {
    this.signinInfo.user_id = this.saveUserId.saveId;
    this.checkbox = this.saveUserId.saveCheck;
  },
  data() {
    return {
      passwordShow: false,
      signinInfo: {},
    };
  },
  computed: {
    ...mapState("userStore", ["saveUserId"]),
    ...mapState("ruleStore", ["emailRules", "passwordRules"]),
  },
  methods: {
    async signin() {
      if (!this.$refs.form.validate()) {
        alert("로그인 실패");
        return;
      }
      let response = await this.$store.dispatch("userStore/signIn", {
        signinInfo: this.signinInfo,
        saveCheck: this.checkbox,
        saveId: this.signinInfo.user_id,
      });
      if (response) {
        this.$router.replace({ name: "main" });
      } else {
        alert("로그인 실패");
        this.$refs.form.reset();
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
