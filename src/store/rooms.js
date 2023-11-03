export default {
  state: {
    rooms: [
      {
        id: 1,
        title: "Room 1",
        desc: "Text Text TextTextTextTextText Text",
        images: [
          "/img/rooms/1.jpg",
          "/img/rooms/2.jpg",
          "/img/rooms/3.jpg",
          "/img/rooms/4.jpg",
        ],
        list: [
          {
            name: "Вместимость",
            text: "1 человека",
          },
          {
            name: "Питание",
            text: "Включен обед и ужин",
          },
          {
            name: "Вид кровати",
            text: "односпальная, двухспальная",
          },
        ],
      },
      {
        id: 2,
        title: "Room 2",
        desc: "Text Text TextTextTextTextText Text",
        images: [
          "/img/rooms/1.jpg",
          "/img/rooms/2.jpg",
          "/img/rooms/3.jpg",
          "/img/rooms/4.jpg",
        ],
        list: [
          {
            name: "Вместимость",
            text: "1 человека",
          },
          {
            name: "Вид кровати",
            text: "односпальная",
          },
        ],
      },
    ],
  },
  getters: {
    rooms: (s) => s.rooms,
  },
  mutations: {},
  actions: {},
};
