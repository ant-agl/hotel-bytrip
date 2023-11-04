import api from "@/axios/api";

export default {
  state: {
    rooms: [],
  },
  getters: {
    rooms: (s) => s.rooms,
  },
  mutations: {
    setRooms(s, rooms) {
      s.rooms = rooms;
    },
  },
  actions: {
    async getRooms({ commit }) {
      return api
        .get("/get_rooms_info.php")
        .then((response) => {
          response.data.forEach((room) => {
            let beds = [];
            room.beds.forEach((bed) => {
              switch (bed) {
                case "single":
                  beds.push("односпальная");
                  break;
                case "double":
                  beds.push("двухспальная");
                  break;
              }
            });

            let list = [
              {
                name: "Вместимость",
                text: room.person + " человека",
              },
              {
                name: "Питание",
                text: room.feed,
              },
              {
                name: "Вид кровати",
                text: beds.join(", "),
              },
            ];
            room.list = list;
          });

          console.log("getRooms", response.data);
          commit("setRooms", response.data);
        })
        .catch((error) => {
          console.log("getRooms error", error);
        });
    },
  },
};
