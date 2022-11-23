<template>
  <div id="app" class="my-16 mx-16 px-16 py-5">
    <v-col cols="12" class="py-0 px-0">
      <v-text-field label="제목 입력" solo v-model="subject"></v-text-field>
    </v-col>
    <vue-editor v-model="content" style="height: 500px" :editorToolbar="customToolbar"></vue-editor>
    <div class="text-right mt-16">
      <v-btn depressed color="secondary" class="my-5" @click="writeNotice"> 작성 완료</v-btn>
      <v-btn depressed color="secondary" class="my-5 mx-5 ml-2" @click="moveList"> 작성 취소 </v-btn>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions } from "vuex";

export default {
  components: {
    VueEditor,
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
    ...mapActions("boardStore", ["insertBoard"]),
    async writeNotice() {
      if (this.subject == "") {
        alert("제목을 입력해주세요.");
      } else if (this.content == "") {
        alert("내용을 입력해주세요.");
      } else {
        let board = {
          userId: "",
          subject: this.subject,
          content: this.content,
          hit: 0,
          registerTime: 0,
        };
        await this.insertBoard(board);
        alert("성공적으로 등록되었습니다. ");
        this.$router.push({ name: "boardlist" });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
