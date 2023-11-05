export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/arrivals-departures",
    name: "arrivals-departures",
    component: () => import("@/views/ArrivalsDeparturesView.vue"),
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/views/PersonalView.vue"),
  },
  {
    path: "/edit-room",
    name: "edit-room",
    component: () => import("@/views/EditRoomView.vue"),
  },
  {
    path: "/edit-room/add",
    name: "add-room",
    component: () => import("@/views/AddRoomView.vue"),
  },
  {
    path: "/edit-room/:id",
    component: () => import("@/views/AddRoomView.vue"),
  },
];
