<template>
  <AppContent title="Редактирование номеров">
    <div class="menu">
      <router-link to="/edit-room/add" class="link">
        + Добавить номер
      </router-link>
    </div>

    <ListRoom :rooms="rooms" />
  </AppContent>
</template>

<script>
import AppContent from "@/components/app/AppContent";
import ListRoom from "@/components/room/ListRoom";

export default {
  components: { AppContent, ListRoom },
  data: () => ({
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
  }),
};
</script>

<style lang="scss" scoped>
.menu {
  margin-bottom: 20px;
}
</style>
