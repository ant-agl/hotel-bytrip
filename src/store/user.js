import api from "@/axios/api";
import router from "@/router";

export default {
  state: {
    user: {},
  },
  getters: {
    user: (s) => s.user,
    name: (s) => {
      if (s.user.id == undefined) return "";
      return s.user.surname + " " + s.user.name;
    },
  },
  mutations: {
    setUser(s, data) {
      s.user = data;
    },
  },
  actions: {
    async auth({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .post("/auth.php")
          .then((response) => {
            console.log("auth", response.data);
            resolve(response.data);
            commit("setUser", response.data);
          })
          .catch((error) => {
            console.log("auth error", error);
            delete localStorage.token;
            reject(error);
          });
      });
    },
    async login(ctx, { login, password }) {
      const data = { login, password };
      return new Promise((resolve, reject) => {
        api
          .post("/login_hash.php", data)
          .then((response) => {
            console.log("login_hash", response.data);
            const dataHah = response.data;

            api
              .post("/login.php", dataHah)
              .then((response) => {
                console.log("login", response.data);

                resolve(dataHah);
              })
              .catch((error) => {
                console.log("login error", error);
              });
          })
          .catch((error) => {
            console.log("login_hash error", error);
            reject(error);
          });
      });
    },
    async confirmCode({ commit }, { login, hash_verify, code }) {
      const data = { login, hash_verify, code };
      return new Promise((resolve, reject) => {
        api
          .post("/token_generation.php", data)
          .then((response) => {
            console.log("token_generation", response.data);
            resolve(response.data.token);
            commit("setUser", response.data);
          })
          .catch((error) => {
            console.log("token_generation error", error);
            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit("setUser", {});
      delete localStorage.token;
      router.push("/login");
    },
  },
};
