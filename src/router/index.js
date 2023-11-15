import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to, from, next) => {
  const isToken = !!localStorage.token;
  const isRequireAuth = to.meta.auth !== false;

  let isAuth = true; //isToken;
  if (isToken && store.getters.user.id === undefined) {
    store
      .dispatch("auth")
      .then(() => {
        isAuth = true;
      })
      .catch(() => {
        isAuth = false;
      });
  }

  if (isRequireAuth && !isAuth) {
    next("/login");
  } else if (!isRequireAuth && isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
