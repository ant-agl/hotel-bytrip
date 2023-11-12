export const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "empty",
      auth: false,
    },
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/forgot",
    name: "forgot",
    meta: {
      layout: "empty",
      auth: false,
    },
    component: () => import("@/views/auth/ForgotView.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/arrivals-departures",
    name: "arrivals-departures",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/ArrivalsDeparturesView.vue"),
  },
  {
    path: "/personal",
    name: "personal",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/PersonalView.vue"),
  },
  {
    path: "/edit-room",
    name: "edit-room",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/EditRoomView.vue"),
  },
  {
    path: "/edit-room/add",
    name: "add-room",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/AddRoomView.vue"),
  },
  {
    path: "/edit-room/:id",
    meta: {
      layout: "main",
    },
    component: () => import("@/views/AddRoomView.vue"),
  },
];
