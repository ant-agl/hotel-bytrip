<template>
  <main class="router-view">Главное</main>

  <button @click="show({ message: 'Сообщение об ошибке', type: 'error' })">
    Сообщение об ошибке
  </button>
  <button @click="show({ message: 'Другое сообщение', type: 'success' })">
    Сообщение об чем-то ином
  </button>

  <IconHint />
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["showNotification"]),
    show(notification) {
      this.showNotification(notification);
    },
  },
};
</script>
