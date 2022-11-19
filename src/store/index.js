import Vue from "vue";
import Vuex from "vuex";

import mapStore from "@/store/modules/mapStore.js";
import userStore from "@/store/modules/userStore.js";
import ruleStore from "@/store/modules/ruleStore.js";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, // store를 session storage 에 유지
      paths: ["mapStore", "userStore"],
    }),
  ],

  modules: { mapStore, userStore, ruleStore },
});
