import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/meineangebote",
    name: "MeineAngebeote",
    component: () => import("../views/meineangebote.vue"),
  },
  {
    path: "/erstellangebot",
    name: "ErstellAngebot",
    component: () => import("../views/ErstellAngebot.vue"),
  },
  {
    path: "/angebot",
    name: "Angebot",
    component: () => import("../views/angebot.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/editoffer",
    name: "EditOffer",
    component: () => import("../views/editoffer.vue"),
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: () => import("../views/wishlist.vue"),
  },
  {
    path: "/chats",
    name: "Chats",
    component: () => import("../views/chats.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
