<template>
  <form class="form-flex">
    <AppInput
      :modelValue="capacity"
      placeholder="Вместимость номера"
      title="Вместимость номера"
      @update:modelValue="updateCapacity"
    />

    <button type="button" class="link" @click="modalActive = true">
      + Добавить тариф
    </button>

    <TariffTable
      v-if="tariffs.length > 0"
      :tariffs="tariffs"
      :capacity="capacity ? capacity : 1"
      @updateTariff="$emit('updateTariff', $event)"
      @deleteTariff="$emit('deleteTariff', $event)"
    />
    <p v-else>Тарифов нет</p>

    <ModalTariff
      :isActive="modalActive"
      :capacity="capacity ? capacity : 1"
      :tariffs="tariffs"
      @close="modalActive = false"
      @addTariff="$emit('addTariff', $event)"
    />

    <DiscountChildren
      :discounts="discounts"
      :isChild="isChild"
      @addDiscount="$emit('addDiscount', $event)"
      @updateDiscount="$emit('updateDiscount', $event)"
      @deleteDiscount="$emit('deleteDiscount', $event)"
      @updateIsChild="$emit('updateIsChild', $event)"
    />
  </form>
</template>

<script>
import AppInput from "@/components/app/AppInput";
import TariffTable from "@/components/room/TariffTable";
import ModalTariff from "@/components/room/ModalTariff";
import DiscountChildren from "@/components/room/DiscountChildren";

export default {
  components: { AppInput, TariffTable, ModalTariff, DiscountChildren },
  emits: [
    "addTariff",
    "updateCapacity",
    "updateTariff",
    "deleteTariff",
    "addDiscount",
    "updateDiscount",
    "deleteDiscount",
    "updateIsChild",
  ],
  props: {
    discounts: Array,
    tariffs: Object,
    isChild: Boolean,
    capacity: [Number, String],
  },
  data() {
    return {
      modalActive: false,
    };
  },
  methods: {
    updateCapacity(val) {
      if (val == "") {
        this.$emit("updateCapacity", "");
      } else {
        this.$emit("updateCapacity", val < 1 ? 1 : Number(val));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-size: 16px;
  display: inline-block;
}
</style>
