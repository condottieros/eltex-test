import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import TestLine from "@/views/TestLine.vue"
import axios from "@/plugins/axios"
import store from "@/store"

type ResultLogin = { result: false } | { result: true; user: string };

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "root",
    component: TestLine
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    //component: () => import(/* webpackChunkName: "line" */ "../views/TestLine.vue")
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(async (to, from, next) => {
  if (store.state.user.isAuth) return to.path === '/' ? next() : next('/')
  try {
    const { data: res } = await axios.get<ResultLogin>("/check-auth", {
      withCredentials: true
    });
    if (res.result) {
      store.commit("login", res.user);
      return to.path === '/' ? next() : next('/')
    } else return to.path === '/login' ? next() : next('/login')
  } catch (e) {
    store.commit('connectError', true)
    return to.path === '/login' ? next() : next('/login')
  }
})

export default router;
