<template>
  <v-card class="mx-16 my-1 px-16 py-1" style="box-shadow: none">
    <div id="app" class="mb-16 mt-16 pt-5 mx-16 px-16">
      <v-col cols="12" class="py-0 px-0">
        <v-text-field
          class="centered-input text-h5 font-weight-bold"
          solo
          :value="this.board.subject"
          :readonly="true"
        ></v-text-field>
      </v-col>

      <div style="text-align: center">
        <font-awesome-icon icon="fa-solid fa-user" class="pr-1" /><span>{{ board.userId }}</span>
        <font-awesome-icon icon="fa-solid fa-eye" class="pl-5 pr-1" /><span>{{ board.hit }}</span>
        <font-awesome-icon icon="fa-solid fa-clock" class="pl-5 pr-1" /><span>{{ board.registerTime }}</span>
      </div>
      <hr class="mt-2 mb-8" />
      <vue-editor :editorOptions="editorSettings" :value="this.board.content" disabled :editorToolbar="customToolbar" />
      <div class="text-right">
        <v-btn depressed color="secondary" class="my-5" @click="moveList"> 글 목록 </v-btn>
        <v-btn depressed color="secondary" class="my-5 ml-2" @click="moveModify"> 글 수정 </v-btn>
        <v-btn depressed color="secondary" class="my-5 ml-2" @click="deleteBtn"> 글 삭제 </v-btn>
      </div>
    </div>
  </v-card>
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
      editorSettings: {
        modules: {
          toolbar: false,
        },
      },
    };
  },
  created() {
    this.CLEAR_BOARD;
    this.articleNo = this.$route.params.articleNo;

    this.viewBoard(this.articleNo);
  },
  methods: {
    ...mapActions("boardStore", ["deleteBoard", "viewBoard"]),
    ...mapMutations("mapStore", ["CLEAR_BOARD"]),
    moveModify() {
      this.$router.push({
        name: "boardmodify",
        params: { articleNo: this.articleNo },
      });
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    async deleteBtn() {
      if (confirm("정말 삭제하시겠습니까?")) {
        await this.deleteBoard(this.articleNo);
        this.$router.push({ name: "boardlist" });
      }
    },
  },
};
</script>

<style scoped>
::v-deep .ql-editor {
  min-height: 500px;
  font-size: 16px;
}

.centered-input >>> input {
  text-align: center;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none !important;
}

::v-deep .ql-container.ql-snow {
  border: none;
  overflow: visible;
}
</style>
