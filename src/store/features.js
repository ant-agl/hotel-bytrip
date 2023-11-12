import api from "@/axios/apiMain";

export default {
  state: {
    features: [],
  },
  getters: {
    featuresList: (s) => s.features,
  },
  mutations: {
    setFeatures(s, features) {
      s.features = features;
    },
  },
  actions: {
    async getFeatures({ commit }) {
      const idFeatures = 5;
      return api
        .get("/data_filter.php")
        .then((response) => {
          console.log("getFeatures", response.data);
          commit(
            "setFeatures",
            response.data.filter((f) => f.category == idFeatures)
          );
        })
        .catch((error) => {
          console.log("getFeatures error", error);
        });
    },
  },
};
