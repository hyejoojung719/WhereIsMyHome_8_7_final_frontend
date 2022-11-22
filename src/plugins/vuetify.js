import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

// fontawesome 코드
import "font-awesome/css/font-awesome.min.css"; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2C3639",
        secondary: "#A27B5C",
      },
      icons: {
        iconfont: "fa4",
      },
    },
  },
});
