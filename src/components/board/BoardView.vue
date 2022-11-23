<template>
  <div id="app" class="my-16 mx-16">
    <v-col cols="12" class="py-0 px-0">
      <v-text-field solo :value="this.board.subject"></v-text-field>
    </v-col>
    <v-card elevation="2"><vue-editor :value="this.board.content" disabled :editorToolbar="customToolbar" /></v-card>
    <div class="text-right">
      <v-btn depressed color="secondary" class="my-5" @click="moveModify"> 글 수정 </v-btn>
      <v-btn depressed color="secondary" class="my-5 ml-2"> 글 삭제 </v-btn>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    VueEditor,
  },
  computed: {
    ...mapState("boardStore", ["board"]),
  },
  data() {
    return {
      articleNo: 0,
      customToolbar: [[]],
    };
  },
  created() {
    this.CLEAR_BOARD;
    this.articleNo = this.$route.params.articleNo;

    this.viewBoard(this.articleNo);
  },
  methods: {
    ...mapActions("boardStore", ["viewBoard"]),
    ...mapMutations("mapStore", ["CLEAR_BOARD"]),
    moveModify() {
      this.$router.push({
        name: "boardmodify",
        params: { articleNo: this.articleNo },
      });
    },
  },
};
</script>

<style scoped>
::v-deep .ql-toolbar.ql-snow {
  display: none;
}

::v-deep .ql-container.ql-snow {
  border: none;
}
</style>
