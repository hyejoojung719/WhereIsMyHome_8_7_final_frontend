<template>
  <v-app>
    <user-header-view></user-header-view>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet outlined rounded="lg">
              <v-list v-model="link" mandatory color="transparent">
                <!-- v-list-item 안에 링크 기입 시  -->
                <v-list-item v-for="(list, idx) in linklists" :key="idx" :to="{ name: list.link }" link>
                  <v-list-item-content>
                    <v-list-item-title> {{ list.title }} {{ list.link }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4" @click.prevent="signout">
                  <v-list-item-content>
                    <v-list-item-title> 로그아웃 </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserHeaderView from "@/components/user/common/UserHeaderView.vue";

export default {
  components: {
    UserHeaderView,
  },
  data: () => ({
    //이동 페이지 정보
    //title : 명칭, link : route 정보
    linklists: [
      { title: "내 정보", link: "userMyPage" },
      { title: "회원 정보 수정", link: "userUpdate" },
      { title: "관심 아파트 정보", link: "userSignUp" },
    ],
    link: 1,
  }),
  methods: {
    async signout() {
      await this.$store.dispatch("userStore/signOut");
      this.$router.replace({ name: "main" }).catch(() => {}); //홈 화면 이동
    },
  },
};
</script>

<style></style>
