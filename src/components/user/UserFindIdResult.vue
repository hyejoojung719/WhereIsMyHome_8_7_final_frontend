v
<template>
  <v-container class="d-flex mx-auto pa-0" style="height: 90vh">
    <v-col class="ma-auto pa-0" cols="4" no-gutters>
      <v-row> <h1 class="mx-auto my-4">아이디 찾기 결과</h1> </v-row>
      <v-row style="justify-content: center">입력된 정보로 {{ count }}개의 아이디를 찾았습니다.</v-row>
      <v-row class="py-2">
        <v-divider color="black"></v-divider>
      </v-row>
      <v-row style="justify-content: center">
        <v-radio-group v-model="idResultSelected" class="ma-0" column v-if="count != 0">
          <v-radio v-for="(result, index) in idResults" :key="index" :value="result.user_id">
            <template v-slot:label>
              <a class="text-decoration-underline">{{ result.user_id }}</a>
            </template>
          </v-radio>
        </v-radio-group>
        <template v-else> 아이디가 존재하지 않습니다. </template>
      </v-row>
      <v-row v-show="!!!selected ? false : true"
        ><v-alert dense text type="success" style="width: 100%"> 선택한 아이디를 복사하였습니다. </v-alert></v-row
      >
      <v-row class="my-4 mx-10">
        <v-btn class="secondary mx-auto" width="40%" :to="{ name: 'userFindPassword' }">비밀번호 찾기</v-btn>
        <v-btn class="primary mx-auto" :to="{ name: 'userSignIn' }" width="40%">로그인</v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      idResults: [],
      selected: false,
      idResultSelected: "",
    };
  },
  computed: {
    count() {
      if (this.idResults != null) {
        return this.idResults.length;
      } else {
        return 0;
      }
    },
  },
  watch: {
    idResultSelected() {
      navigator.clipboard.writeText(this.idResultSelected);
      this.selected = true;
    },
  },
  async created() {
    let response = await this.$store.dispatch("userStore/findId", this.$route.params.userInfo);
    this.idResults = response;
  },
  methods: {
    copyToClipBoard() {
      navigator.clipboard.writeText(this.idResultSelected);
      this.selected = true;
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
