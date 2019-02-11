import Vue from "vue";
import Router from "vue-router";

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
      path: "/login",
      name: "login",
      component: () => import("./views/login/LoginPage")
    },
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/Home")
    },
    {
      path: "/products",
      name: "home_products",
      component: () => import("./views/home/Products")
    },
    {
      path: "/shoppingCart/:orderId",
      name: "shopping_cart",
      component: () => import("./views/home/ShoppingCart")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/dashboard/Dashboard"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/admin",
          name: "admin_products",
          component: () => import("./views/dashboard/Products"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/order",
          name: "admin_order",
          component: () => import("./views/dashboard/Order"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/coupon",
          name: "admin_coupon",
          component: () => import("./views/dashboard/Coupon")
        },
        {
          path: "/admin/customer_order",
          name: "customer_order",
          component: () => import("./views/dashboard/CustomerOrder"),
          meta: { requiresAuth: true }
        },
        {
          path: "/admin/checkout/:orderId",
          name: "checkout",
          component: () => import("./views/dashboard/Checkout")
        }
      ]
    }
  ]
});
