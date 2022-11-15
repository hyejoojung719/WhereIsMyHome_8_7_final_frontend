<template>
  <div id="app">
    <v-app>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" sm="3">
            <v-select v-model="sidoCode" :options="sidos" @change="gugunList" label="시/도"></v-select>
          </v-col>
          <v-col class="d-flex" sm="2">
            <v-select :items="items" label="구/군" solo></v-select>
          </v-col>
          <v-col class="d-flex" sm="1">
            <v-select :items="items" label="동" solo></v-select>
          </v-col>
          <v-btn color="secondary"> 검색 </v-btn>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      sidoCode: null,
    };
  },
  computed: {
    ...mapState(["sidos"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
  },
};
</script>

<style scoped></style>
