<template>
  <v-sheet min-height="70vh" rounded="lg" elevation="4">
    <v-col>
      <v-row>
        <v-icon class="mx-auto" x-large style="font-size: 250px"> mdi-account-circle </v-icon>
      </v-row>
      <v-sheet max-width="60vh">
        <v-list two-line class="mx-auto">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-email </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">이메일</v-list-item-title>
              <v-list-item-subtitle>ssafy@ssafy.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-account-box </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">이름</v-list-item-title>
              <v-list-item-subtitle>김싸피</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-cake-variant-outline </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">생년월일</v-list-item-title>
              <v-list-item-subtitle>2022년 7월 6일</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
  </v-sheet>
</template>

<script>
export default {};
</script>

<style scoped>
::deep .v-icon {
  font-size: 90px;
}
</style>
