import Vue from "vue";
import App from "./App.vue";
import BookmarkStore from "./util/BookmarkStore";
import Toasted from "vue-toasted";

Vue.use(Toasted);
Vue.config.productionTip = false;

new Vue({
  data: {
    sharedState: BookmarkStore.state
  },
  render: h => h(App)
}).$mount("#app");
