<template>
  <div id="app">
    <v-app>
      <v-card class="mx-16 my-16 px-16 py-16" style="min-height: 70vh">
        <v-card-title>
          회원 관리
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="userList"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
          v-model="selected"
          show-select
          item-key="user_id"
        >
          <template v-slot:item="props">
            <tr>
              <td>{{ props.index + 1 }}</td>
              <td>{{ props.item.user_id }}</td>
              <td>{{ props.item.user_name }}</td>
              <td>{{ props.item.user_birth }}</td>
              <td><v-simple-checkbox :value="props.isSelected" @input="props.select($event)"></v-simple-checkbox></td>
            </tr>
          </template>
          <template v-slot:no-data>회원 정보가 없습니다.</template>
          <template v-slot:no-results>검색된 결과가 없습니다.</template>
        </v-data-table>
        <div class="text-right">
          <v-btn depressed color="secondary" class="my-5 mx-5" @click="deleteUserList"> 선택 삭제 </v-btn>
        </div>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount" color="primary"></v-pagination>
        </div>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      selected: [],
      headers: [
        { text: "Index", align: "start", value: "" },
        { text: "이메일", value: "user_id" },
        { text: "이름", value: "user_name" },
        { text: "생년월일", value: "user_birth" },
        { text: "", value: "data-table-select" },
      ],
      userList: [
        // {
        //   user_id: "Yogurt@ssafy.com",
        //   user_name: "김싸피",
        //   user_birth: "2022-07-06",
        // },
      ],
    };
  },
  async created() {
    let response = await this.$store.dispatch("userStore/selectUserListAll");
    this.userList = response;
  },
  methods: {
    async deleteUserList() {
      console.log(this.selected);
      let response = await this.$store.dispatch("userStore/deleteUserList", this.selected);
      if (response) {
        alert("삭제 성공");
        this.userList = await this.$store.dispatch("userStore/selectUserListAll");
      }
    },
  },
};
</script>

<style></style>
