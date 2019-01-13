import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/dashboard/Dashboard.vue";
import Products from "./views/dashboard/Products.vue";
import Order from "./views/dashboard/Order.vue";
import Login from "./views/login/Login.vue";
import LoginPage from "./views/login/LoginPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      component: Dashboard,
      // meta: { requiresAuth: true }
      children: [
        {
          path: "",
          name: "products",
          component: Products
          // meta: { requiresAuth: true }
        },
        {
          path: "order",
          name: "order",
          component: Order
          // meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "login",
      name: "",
      component: LoginPage,
      children: [
        {
          path: "",
          name:'login',
          component: Login
        }
      ]
    }
  ]
});
