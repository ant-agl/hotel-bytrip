<template>
  <div class="tariffs">
    <div
      v-for="(tariff, index) in tariffs"
      :key="tariff.period"
      class="tariffs__item"
      @click="
        tariffIndex = index;
        modalActive = true;
      "
    >
      <div class="tariffs__date">{{ tariff.period }}</div>
      <div class="tariffs__prices">
        <div
          v-for="(price, i) in tariff.prices"
          :key="price"
          class="tariffs__price"
          :class="{ error: price == 0 }"
        >
          {{ i }} чел. - {{ price }} руб.
        </div>
      </div>
    </div>
  </div>

  <ModalTariff
    :isActive="modalActive"
    :capacity="capacity ? capacity : 1"
    :tariffs="tariffs"
    :tariff="tariff"
    @close="
      tariffIndex = false;
      modalActive = false;
    "
    @updateTariff="$emit('updateTariff', $event)"
    @deleteTariff="$emit('deleteTariff', $event)"
  />
</template>

<script>
import ModalTariff from "@/components/room/ModalTariff";
import { toRaw } from "vue";

export default {
  components: { ModalTariff },
  emits: ["updateTariff", "deleteTariff"],
  props: {
    tariffs: Array,
    capacity: Number,
  },
  data: () => ({
    modalActive: false,
    tariffIndex: false,
  }),
  computed: {
    tariff() {
      if (this.tariffIndex === false) return false;

      let tariff = {
        ...toRaw(this.tariffs[this.tariffIndex]),
        index: this.tariffIndex,
      };
      return tariff;
    },
  },
};
</script>

<style lang="scss" scoped>
.tariffs {
  width: 100%;

  &__item {
    padding: 20px 10px;
    display: flex;
    gap: 50px;
    border-bottom: 1px solid var(--gray);
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: var(--light-blue);
    }
  }
  &__prices {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__price.error {
    color: var(--color-red);
  }
}
</style>
