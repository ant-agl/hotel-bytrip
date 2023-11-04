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
  },
};
