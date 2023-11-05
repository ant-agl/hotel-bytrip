<template>
  <AppContent title="Редактирование номеров">
    <div class="menu">
      <router-link to="/edit-room/add" class="link">
        + Добавить номер
      </router-link>
    </div>

    <ListRoom v-if="!isLoading" :rooms="rooms" />
    <AppLoad v-else />
  </AppContent>
</template>

<script>
import AppContent from "@/components/app/AppContent";
import ListRoom from "@/components/room/ListRoom";
import AppLoad from "@/components/app/AppLoad";
import { mapGetters } from "vuex";

export default {
  components: { AppContent, ListRoom, AppLoad },
  data: () => ({
    isLoading: true,
  }),
  computed: {
    ...mapGetters(["rooms"]),
  },
  async mounted() {
    if (this.rooms.length == 0) await this.$store.dispatch("getRooms");
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.menu {
  margin-bottom: 20px;
}
.room-list {
  animation: show 0.4s both;
}
</style>
