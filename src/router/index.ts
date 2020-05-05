import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import TestLine from "@/views/TestLine.vue";
import { checkLoginService } from "@/services";
import store from "@/store";

type ResultLogin = { result: false } | { result: true; user: string };

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "root",
    component: TestLine,
    meta: { secure: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    /**
     * здесь вызываем сервис проверяющий залогинен пользователь или нет
    */
    beforeEnter: async (to, from, next) => {
      const redirect = to.query.redirect || "/";
      const r = await checkLoginService();
      if (r) {
        return next(redirect as string)
      }
      next()
    }
  }
  , {
    name: "secure-page",
    path: "/secure-page",
    component: () => import("../views/SecurePage.vue"),
    meta: { secure: true }
  }, {
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
  /**
   * Перед каждым роутом просто проверяем помечен ли он в мета-нформации
   * как секьюрный и если юзер не залогинен в сторе то перенаправляем в компонент логина
   * проверка сессий происходит в хуке логина beforeEnter 
   * чтобы предотвратить прорисовку компонента логина если юзер 
   * залогинен через сессию
   * если юзер не залогиген сохраняем в параметр запроса полный путь по которому
   * юзер попытался войти в приложении чтобы после логина отредиректить именно на него
  */
  if (to.matched.some(x => x.meta.secure)) {
    if (!store.getters.isAuth) {
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }
  next()
})

export default router;
