import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import Dashboard from "./views/dashboard/Dashboard.vue";
import Products from "./views/dashboard/Products.vue";

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
      component: App,
      // meta: { requiresAuth: true }
      children: [
        {
          path: "/login",
          name: "Login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Login.vue")
        }
      ]
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "Products",
          component: Products
          // meta: { requiresAuth: true }
        }
      ]
    }
  ]
});
