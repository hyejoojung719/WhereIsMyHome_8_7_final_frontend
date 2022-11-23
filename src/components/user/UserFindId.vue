v
<template>
  <v-container class="d-flex mx-auto pa-0" style="height: 90vh">
    <v-col class="ma-auto pa-0" cols="4" no-gutters>
      <v-form ref="form">
        <v-row> <h1 class="mx-auto my-8">아이디 찾기</h1> </v-row>
        <v-row style="justify-content: center">가입 시 등록한 정보를 입력해주세요.</v-row>
        <v-row class="py-4">
          <v-divider color="black"></v-divider>
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
        <v-row class="my-6 mx-10">
          <v-btn class="primary mx-auto" block @click="findIdResult">아이디 찾기</v-btn>
        </v-row>
      </v-form>
    </v-col>
    <v-dialog v-model="findIDdialog" scrollable max-width="500px">
      <v-card>
        <v-card-title> 아이디 찾기 결과 </v-card-title>
        <v-card-text style="height: 100px">
          <v-radio-group v-model="institutionSelected" column>
            <v-radio
              v-for="(institution, index) in itemInstitutions"
              :key="index"
              :label="institution"
              :value="institution"
            ></v-radio>
          </v-radio-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="findIDdialog = false"> Close </v-btn>
          <v-btn color="primary" text @click="copyToClipBoard"> Copy </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: {},
      today: new Date().toISOString().substr(0, 10),
      menu: false,
      findIDdialog: false,
      itemInstitutions: ["Two-line item", "another item"],
      institutionSelected: "",
    };
  },
  computed: {
    ...mapState("ruleStore", ["nameRules", "birthRules"]),
  },
  methods: {
    date_search(v) {
      this.userInfo.user_birth = v;
      this.menu = false;
      this.$refs.birthmenu.save(v);
    },
    async findIdResult() {
      let response = await this.$store.dispatch("userStore/findId", this.userInfo);
      console.log(response);
      this.findIDdialog = true;
    },

    copyToClipBoard() {
      this.findIDdialog = false;
      navigator.clipboard.writeText(this.institutionSelected);
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
