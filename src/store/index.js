import { createStore } from "vuex";
import rooms from "./rooms";
import services from "./services";
import features from "./features";
import user from "./user";

export default createStore({
  state: {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL2hvdGVsLmJ5dHJpcC5ydSIsInN1YiI6ImhvdGVsaWVycyIsImF1ZCI6NDIsImp0aSI6NjMwNDgwNTcsInVzZCI6IntcImlkXCI6NzQsXCJzdXJuYW1lXCI6XCJcXHUwNDQ2XFx1MDQzYVxcdTA0M2ZcXHUwNDQ2XFx1MDQzYVwiLFwibmFtZVwiOlwiXFx1MDQ0NlxcdTA0NDNcXHUwNDMwXFx1MDQ0NlxcdTA0NDNcIixcInBob25lXCI6XCIrNzkxMzE1MzUyMjBcIixcImhvdGVsX2lkXCI6NjUsXCJwYXRyb255bWljXCI6XCJ3ZWZ3ZWZcIixcImVtYWlsXCI6XCJhZ2xhbnRvbjMxQGdtYWlsLmNvbVwiLFwiZGZhXCI6MH0iLCJpYXQiOiIxNjk5MDgwOTk5IiwibmJmIjoxNjk5MDgxMDAwLCJleHAiOjE3MDk0NDkwMDB9.xeCvc4QtkBP_F-WHRxU25ti1UnSrwvruZQIG_fB8Tmb0gysRvvXDzwCB1UnXcGWa7EhOHazjFm7P1EBSs9Lr7A",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { rooms, services, features, user },
});
