import http from "@/util/http";

const boardStore = {
  namespaced: true,
  state: () => ({
    boards: [],
    board: {},
  }),
  getters: {},
  mutations: {
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    SET_BOARD(state, board) {
      state.board = board;
    },
    CLEAR_BOARD(state) {
      state.board = {};
    },
  },
  actions: {
    async getBoards({ commit }) {
      try {
        const { data } = await http.get("/board/list");
        commit("SET_BOARDS", data);
      } catch (error) {
        console.log(error);
      }
    },
    async insertBoard({ commit }, board) {
      console.log(commit);
      try {
        await http.post(`/board`, board);
      } catch (error) {
        console.log(error);
      }
    },
    async viewBoard({ commit }, articleNo) {
      try {
        let { data } = await http.get("/board/" + articleNo);
        commit("SET_BOARD", data);
      } catch (error) {
        console.log(error);
      }
    },
    async modifyBoard({ commit }, board) {
      console.log("viewBoard 들어옴");
      try {
        let { data } = await http.put(`/board`, board);
        commit("SET_BOARD", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default boardStore;
