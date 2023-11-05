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
      <div v-if="services.free.length > 0">
        <AppAccordion />
        <div v-for="service in services.free" :key="service">{{ service }}</div>
      </div>
      <p v-else class="services__zero">Добавленных услуг пока нет</p>
    </div>
  </div>

  <ModalAddService
    :isActive="isModalAdd"
    @addService="$emit('addService', $event)"
    @close="isModalAdd = false"
  />
  <AppModal
    :showed="isModalCreate"
    title="Создать услугу"
    @close="isModalCreate = false"
  >
    <template v-slot:footer>
      <AppBtn>Создать</AppBtn>
    </template>
  </AppModal>
</template>

<script>
import AppModal from "@/components/app/AppModal";
import AppAccordion from "@/components/app/AppAccordion";
import ModalAddService from "@/components/room/ModalAddService";
import AppBtn from "@/components/app/AppBtn";

export default {
  components: { AppModal, AppBtn, ModalAddService, AppAccordion },
  emits: ["addService"],
  props: {
    services: Object,
  },
  data: () => ({
    isModalAdd: false,
    isModalCreate: false,
  }),
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
