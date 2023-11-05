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
        <AppHideContent title="Бесплатные" :open="true">
          <div class="services__list">
            <TransitionGroup name="list">
              <div v-for="id in services.free" :key="id" class="services__item">
                <span>{{ getNameService(id) }}</span>
                <img
                  src="@/assets/img/icons/cross.svg"
                  class="services__icon-cross"
                  @click="$emit('removeService', { id, free: true })"
                />
              </div>
            </TransitionGroup>
          </div>
        </AppHideContent>
      </div>
      <div v-if="services.paid.length > 0">
        <AppHideContent title="Платные" :open="true">
          <div class="services__list">
            <TransitionGroup name="list">
              <div
                v-for="service in services.paid"
                :key="service.id"
                class="services__item"
              >
                <span>
                  {{ getNameService(service.id) }}
                  ({{ service.price }} руб.
                  {{ service.type == "in-day" ? "/ сутки" : "" }})
                </span>
                <img
                  src="@/assets/img/icons/cross.svg"
                  class="services__icon-cross"
                  @click="$emit('removeService', { id, free: false })"
                />
              </div>
            </TransitionGroup>
          </div>
        </AppHideContent>
      </div>

      <p
        v-if="services.free.length == 0 && services.paid.length == 0"
        class="services__zero"
      >
        Добавленных услуг пока нет
      </p>
    </div>
  </div>

  <ModalAddService
    :isActive="isModalAdd"
    @addService="$emit('addService', $event)"
    @close="isModalAdd = false"
  />
  <ModalCreateService
    :isActive="isModalCreate"
    @close="isModalCreate = false"
  />
</template>

<script>
import AppHideContent from "@/components/app/AppHideContent";
import ModalAddService from "@/components/room/ModalAddService";
import ModalCreateService from "@/components/room/ModalCreateService";

export default {
  components: { ModalAddService, ModalCreateService, AppHideContent },
  emits: ["addService", "removeService"],
  props: {
    services: Object,
  },
  data: () => ({
    isModalAdd: false,
    isModalCreate: false,
  }),
  methods: {
    getNameService(id) {
      const service = this.$store.getters.servicesList.find((s) => s.id == id);
      return `${service.category} – ${service.name}`;
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

  &__list {
    display: flex;
    flex-direction: column;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-radius: 8px;
    transition: 0.2s;

    &:hover {
      background-color: var(--light-blue);
    }
  }
  &__icon-cross {
    width: 25px;
    opacity: 0;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 1 !important;
    }
  }
  &__item:hover &__icon-cross {
    opacity: 0.5;
  }
}
</style>
