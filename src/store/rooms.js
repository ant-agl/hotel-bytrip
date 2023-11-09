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
    addRoom(s, room) {
      s.rooms.push(room);
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
    async addRoom({ commit }, data) {
      return new Promise((resolve, reject) => {
        api
          .post("add_room.php", data)
          .then((response) => {
            console.log("addRoom", response.data);
            data.id = response.data;
            commit("addRoom", data);

            resolve(data);
          })
          .catch((error) => {
            console.log("addRoom error", error);
            reject(error);
          });
      });
    },
  },
};
