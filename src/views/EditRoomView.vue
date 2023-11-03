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
import { mapGetters } from "vuex";

export default {
  components: { AppContent, ListRoom },
  computed: {
    ...mapGetters(["rooms"]),
  },
};
</script>

<style lang="scss" scoped>
.menu {
  margin-bottom: 20px;
}
</style>
