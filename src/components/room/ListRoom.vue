<template>
  <div class="room-list" v-if="rooms.length > 0">
    <ItemRoom v-for="room in rooms" :key="room.id" :room="room" />
  </div>

  <p v-else>Номеров нет</p>
</template>

<script>
import ItemRoom from "@/components/room/ItemRoom";

export default {
  components: { ItemRoom },
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
};
</script>
