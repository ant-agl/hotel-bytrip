<template>
  <div class="services">
    <div class="services__head">
      <button class="link" @click.prevent="isModalAdd = true">
        + Добавить
      </button>
      <button class="link" @click.prevent="isModalCreate = true">
        + Создать
      </button>
    </div>
    <div class="services__body">
      <div v-if="services.length > 0"></div>
      <p v-else class="services__zero">Добавленных услуг пока нет</p>
    </div>
  </div>

  <AppModal
    :showed="isModalAdd"
    title="Добавить услугу"
    @close="isModalAdd = false"
  >
    <AppBtn>Добавить</AppBtn>
  </AppModal>
  <AppModal
    :showed="isModalCreate"
    title="Создать услугу"
    @close="isModalCreate = false"
  >
    <AppBtn>Создать</AppBtn>
  </AppModal>
</template>

<script>
import AppModal from "@/components/app/AppModal";
import AppBtn from "@/components/app/AppBtn";
import { mapGetters } from "vuex";

export default {
  components: { AppModal, AppBtn },
  data: () => ({
    isModalAdd: false,
    isModalCreate: false,
  }),
  computed: {
    ...mapGetters(["services"]),
  },
};
</script>

<style lang="scss" scoped>
.services {
  &__head {
    display: flex;
    gap: 20px;

    .link {
      font-size: 16px;
    }
  }
  &__body {
    padding: 20px 0;
  }
  &__zero {
    font-size: 15px;
  }
}
</style>
