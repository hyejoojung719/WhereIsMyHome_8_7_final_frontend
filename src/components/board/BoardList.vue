<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-card-title>
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
          :items="notices"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        ></v-data-table>
        <div class="text-right">
          <v-btn depressed color="secondary" class="my-5 mx-5" @click="moveWrite"> 글 작성 </v-btn>
        </div>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount" color="primary"></v-pagination>
        </div>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        {
          text: "글 번호",
          align: "start",
          filterable: false,
          value: "articleNo",
        },
        { text: "제목", value: "subject" },
        { text: "작성자", value: "userId" },
        { text: "조회수", value: "hit" },
        { text: "작성 시간", value: "registerTime" },
      ],
      notices: [
        // {
        //   article_no: 1,
        //   title: "제목1",
        //   user_id: "작성자1",
        //   hit: 0,
        //   register_time: 2022,
        // },
      ],
    };
  },
  computed: {
    ...mapState("boardStore", ["boards"]),
  },
  created() {
    this.getBoards();

    this.notices = this.boards;
  },
  methods: {
    ...mapActions("boardStore", ["getBoards"]),
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
  },
};
</script>

<style></style>
