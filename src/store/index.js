import Vue from "vue";
import Vuex from "vuex";

import mapStore from "@/store/modules/mapStore.js";
import userStore from "@/store/modules/userStore.js";

import { createVuexPersistedState } from "vue-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      Storage: window.sessionStorage,
    }),
  ],

  modules: { mapStore, userStore },
});
