<template>
  <v-sheet min-height="70vh" rounded="lg" elevation="4">
    <v-col class="d-flex" style="height: 70vh; flex-direction: column">
      <v-row style="justify-content: center; align-items: center">
        <v-card
          color="#DCD7C9"
          elevation="2"
          class="d-flex"
          style="width: 80%; height: 80%; justify-content: center; align-items: center; flex-direction: column"
        >
          <v-card-title
            ><h3>{{ userInfo.user_name }} 님의 관심 아파트는 총 8개입니다.</h3></v-card-title
          >
          <v-card-actions style="width: 60%">
            <v-btn color="primary" block>관심 아파트 자세히 보기</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <h3 class="px-3">최근 추가된 관심 아파트</h3>
      <v-item-group>
        <v-row v-for="x in 2" :key="x + 'row'">
          <v-col v-for="y in 3" :key="y + 'col'">
            <v-item>
              <v-card color="secondary" class="d-flex align-center" dark height="100">{{ x * 3 + y - 3 }}</v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
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
      items: [],
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
};
</script>

<style scoped>
::deep .v-icon {
  font-size: 90px;
}
</style>
