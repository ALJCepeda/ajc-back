import Vue from "vue";
import VueRouter from "vue-router";

import login from "./modules/main/pages/login.vue";
import home from "./modules/main/pages/home.vue";
import about from "./modules/main/pages/about/about.vue";
import blogsList from "./modules/blog/pages/list.vue";
import blogsView from "./modules/blog/pages/view.vue";
import notFound from "./modules/main/pages/notFound.vue";
import adminPage from "./modules/main/pages/admin/admin.vue";
import store from "@/vuex";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", redirect: "/home", name:'Home' },
    { path: "/login", component: login },
    { path: "/home", component: home },
    { path: "/about", redirect: "/about/overview" },
    { path: "/about/:section", component: about },
    { path: "/blogs", redirect: "/blogs/all" },
    { path: "/blogs/all", component: blogsList },
    { path: "/blogs/:id", component: blogsView },
    { path: "/admin", redirect: "/admin/timeline", name:'Admin'},
    {
      path: "/admin/:section",
      component: adminPage,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isAuthenticated) {
          next("/login");
        } else {
          next();
        }
      }
    },
    { path: "*", component: notFound }
  ]
});
