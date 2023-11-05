import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import PersonalView from "../views/PersonalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: "/personal",
      name: "personal",
      component: PersonalView
    }
  ]
})

export default router
