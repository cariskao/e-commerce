import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/dashboard/Dashboard.vue";
import Products from "./views/dashboard/Products.vue";
import CustomerOrder from "./views/dashboard/CustomerOrder.vue";
import Order from "./views/dashboard/Order.vue";
import Coupon from "./views/dashboard/Coupon.vue";
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
      path: "",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "products",
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: "order",
          name: "order",
          component: Order,
          meta: { requiresAuth: true }
        },
        {
          path: "coupon",
          name: "coupon",
          component: Coupon,
        },
        {
          path: "customer_order",
          name: "customer_order",
          component: CustomerOrder,
        }
      ]
    },
    {
      path: "login",
      name: "login",
      component: LoginPage
    }
  ]
});
