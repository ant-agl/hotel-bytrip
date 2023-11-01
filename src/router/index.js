import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

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

export default router;
