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
import ModalAddService from "@/components/room/ModalAddService";
import AppBtn from "@/components/app/AppBtn";

import { mapGetters } from "vuex";

export default {
  components: { AppModal, AppBtn, ModalAddService },
  data: () => ({
    isModalAdd: false,
    isModalCreate: false,
  }),
  computed: {
    ...mapGetters(["services"]),
    servicesListSelect() {
      let res = [];
      this.servicesList.forEach((item) => {
        res.push({
          id: item.id,
          label: `${item.category} - ${item.name}`,
        });
      });
      return res;
    },
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
