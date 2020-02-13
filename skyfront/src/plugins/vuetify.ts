import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
// import Vuetify from "vuetify";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import theme from "./theme";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi" // default - only for display purposes
  },
  theme: {
    themes: {
      light: theme
    }
  }
});
