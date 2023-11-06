<template>
  <form class="form">
    <AppInput
      v-model.number="capacity"
      placeholder="Вместимость номера"
      title="Вместимость номера"
      @change="
        if (capacity == '' || capacity < 1) {
          capacity = 1;
        }
      "
    />

    <button type="button" class="link" @click="modalActive = true">
      + Добавить тариф
    </button>

    <TariffTable
      v-if="tariffs.length > 0"
      :tariffs="tariffs"
      :capacity="capacity ? capacity : 1"
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
  emits: ["addTariff"],
  props: {
    tariffs: Object,
  },
  data() {
    return {
      capacity: 1,
      modalActive: false,
    };
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
