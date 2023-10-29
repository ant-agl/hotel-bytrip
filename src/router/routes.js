export const routes = [
  {
    path: "/",
    name: "home",
    component: import("@/views/HomeView.vue"),
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/views/PersonalView.vue"),
  },
];
