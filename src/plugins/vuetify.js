import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
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
        iconfont: "fa",
        values: {
          heartfull: "fa-solid fa-heart",
          heartround: "fa-regular fa-heart",
        },
      },
    },
  },
});
