<template>
  <div id="app" class="my-16 mx-16">
    <v-col cols="12" class="py-0 px-0">
      <v-text-field label="제목 입력" solo v-model="subject"></v-text-field>
    </v-col>
    <vue-editor v-model="content" style="height: 500px" :editorToolbar="customToolbar"></vue-editor>
    <div class="text-right mt-16">
      <v-btn depressed color="secondary" class="my-5 mx-5" @click="modifyComplete"> 수정 완료 </v-btn>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    VueEditor,
  },
  computed: {
    ...mapState("boardStore", ["board"]),
  },
  created() {
    // this.viewBoard(this.$route.params.articleNo);
    // console.log("board 정보 : :: ", this.board);
    this.subject = this.board.subject;
    this.content = this.board.content;
  },
  data() {
    return {
      subject: "",
      content: "",
      customToolbar: [
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
        [{ header: 1 }, { header: 2 }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        [{ direction: "rtl" }],
      ],
    };
  },
  methods: {
    ...mapActions("boardStore", ["modifyBoard"]),
    modifyComplete() {
      let board = {
        userId: this.board.userId,
        subject: this.subject,
        content: this.content,
        hit: this.board.hit,
        registerTime: this.board.registerTime,
      };

      this.modifyBoard(board);
      alert("수정 완료!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
