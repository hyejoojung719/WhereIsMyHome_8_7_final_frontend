import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//================ fontawesome
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(fas, far, fab);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
//==================================
import AOS from "aos";
import "aos/dist/aos.css";
//===================

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  mounted() {
    AOS.init();
  },
}).$mount("#app");
