<template>
  <AppModal :showed="isActive" title="Добавить тариф" @close="close">
    <form class="form">
      <AppInput
        :id="'period' + Math.floor(Math.random * 1000)"
        ref="period"
        placeholder="Период"
        title="Период"
        :readonly="true"
      />

      <AppInput
        v-for="i in capacity"
        :key="i"
        v-model.number="prices[i]"
        :title="`Стоимость за ${i} чел., руб.`"
        :placeholder="`Стоимость за ${i} чел., руб.`"
      />
    </form>

    <template v-slot:footer>
      <AppBtn @click="sendForm">Сохранить</AppBtn>
    </template>
  </AppModal>
</template>

<script>
import AppModal from "@/components/app/AppModal";
import AppInput from "@/components/app/AppInput";
import AppBtn from "@/components/app/AppBtn";

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

export default {
  components: { AppModal, AppInput, AppBtn },
  emits: ["addTariff", "close"],
  props: {
    capacity: Number,
    tariff: Object,
    tariffs: Array,
    isActive: Boolean,
  },
  data() {
    return {
      datepicker: false,
      prices: {},
    };
  },
  watch: {
    tariff() {
      if (this.tariff) {
        const arr = this.tariff.period.split("-").map((t) => t.trim());
        const start = this.$moment(arr[0], "DD.MM.YYYY");
        const end = this.$moment(arr[1], "DD.MM.YYYY");

        this.datepicker.selectDate([start, end]);
        this.prices = this.tariff.prices;
      }
    },
  },
  methods: {
    sendForm() {
      const data = {
        period: this.datepicker.$el.value,
        prices: this.prices,
      };
      this.$emit("addTariff", data);
      this.close();
    },
    close() {
      this.datepicker.clear();
      this.prices = {};
      this.$emit("close");
    },
  },
  mounted() {
    this.datepicker = new AirDatepicker("#period input", {
      autoClose: true,
      minDate: new Date(),
      range: true,
      multipleDatesSeparator: " - ",
      onRenderCell: ({ date, cellType }) => {
        if (cellType === "day") {
          for (let i = 0; i < this.tariffs.length; i++) {
            const tariff = this.tariffs[i];

            const arr = tariff.period.split("-").map((t) => t.trim());
            const start = this.$moment(arr[0], "DD.MM.YYYY");
            const end = this.$moment(arr[1], "DD.MM.YYYY");
            const isBetween = this.$moment(date).isBetween(
              start,
              end,
              undefined,
              "[]"
            );
            console.log(date, isBetween);

            if (isBetween) {
              return {
                disabled: true,
                classes: "disabled-class",
              };
            }
          }
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
}
</style>
