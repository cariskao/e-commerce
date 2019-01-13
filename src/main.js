import Vue from "vue";
import Vuex from 'vuex'
import router from "./router";
import mixin from "./mixin";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from "./App.vue";
import store from './store'
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$http = axios;
Vue.use(Vuex);
Vue.use(ElementUI, VueAxios);
Vue.component('Loading', Loading)
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;


new Vue({
  router,
  store,
  mixin,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.meta.requiresAuth) {
    console.log("Need validation");
    const api = "https://vue-course-api.hexschool.io/api/user/check";
    axios.post(api).then(res => {
      if (res.data.success) {
        next();
      } else {
        next({
          path:'/login'
        })
      }
    });
  } else next();
});
