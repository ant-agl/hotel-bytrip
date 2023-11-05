import api from "@/axios/api";

export default {
  state: {
    services: [],
    servicesList: [],
  },
  getters: {
    services: (s) => s.services,
    servicesList: (s) => s.servicesList,
  },
  mutations: {
    setServicesList(s, servicesList) {
      s.servicesList = servicesList;
    },
    addService(s, service) {
      s.servicesList.push(service);
    },
  },
  actions: {
    async getServicesList({ commit }) {
      return api
        .get("/get_all_services.php")
        .then((response) => {
          console.log("getServicesList", response.data);
          commit("setServicesList", response.data);
        })
        .catch((error) => {
          console.log("getServicesList error", error);
        });
    },
    async addService({ commit }, { category, name }) {
      let data = { category, name };
      return new Promise((resolve, reject) => {
        api
          .post("add_service.php", data)
          .then((response) => {
            console.log("addService", response.data);
            data.id = response.data;
            commit("addService", data);

            resolve(data);
          })
          .catch((error) => {
            console.log("addService error", error);
            reject(error);
          });
      });
    },
  },
};
