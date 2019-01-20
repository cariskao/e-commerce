import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import Loading from "vue-loading-overlay";
import App from "./App.vue";
import store from "./store";
import currencyFilter from "./filter/currency";
import "./mixins";
import "vue-loading-overlay/dist/vue-loading.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$http = axios;
Vue.use(Vuex);
Vue.use(ElementUI, VueAxios);
Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const api = "https://vue-course-api.hexschool.io/api/user/check";
  if (to.meta.requiresAuth) {
    axios.post(api).then(res => {
      if (res.data.success) {
        next();
      }
      if (!res.data.success) {
        router.push({ name: "login" });
      }
    });
  } else {
    next();
  }
});
