<template>
  <form class="form">
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
  </form>
</template>

<script>
import AppInput from "@/components/app/AppInput";
import TariffTable from "@/components/room/TariffTable";
import ModalTariff from "@/components/room/ModalTariff";

export default {
  components: { AppInput, TariffTable, ModalTariff },
  emits: ["addTariff", "updateCapacity", "updateTariff", "deleteTariff"],
  props: {
    tariffs: Object,
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
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 15px;
}
.link {
  font-size: 16px;
  display: inline-block;
}
</style>
