import http from "@/util/http";

const boardStore = {
  namespaced: true,
  state: () => ({
    boards: [],
  }),
  getters: {},
  mutations: {
    SET_BOARDS(state, boards) {
      state.boards = boards;
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
  },
};

export default boardStore;
