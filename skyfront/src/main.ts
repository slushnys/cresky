import VueCompositionApi from "@vue/composition-api";
import Vuetify from "vuetify";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
// import store from "./store";
import vuetify from "@/plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "@/plugins";

Vue.use(VueCompositionApi);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
