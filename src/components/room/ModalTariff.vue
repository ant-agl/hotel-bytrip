<template>
  <AppModal :showed="isActive" title="Добавить тариф" @close="close">
    <form class="form">
      <AppInput
        :id="'period-' + datepickerToken"
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
        :isError="prices[i] == 0"
      />
    </form>

    <template v-slot:footer>
      <AppBtn
        v-if="tariff"
        @click="
          $emit('deleteTariff', tariff.index);
          close();
        "
        class="btn_danger"
      >
        Удалить
      </AppBtn>
      <AppBtn @click="sendForm" :disabled="isDisabled">Сохранить</AppBtn>
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
  emits: ["addTariff", "updateTariff", "deleteTariff", "close"],
  props: {
    capacity: Number,
    tariff: [Object, Boolean],
    tariffs: Array,
    isActive: Boolean,
  },
  data() {
    return {
      datepicker: false,
      period: "",
      prices: {},
      datepickerToken: Math.floor(Math.random() * 10000),
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
  computed: {
    isDisabled() {
      const isPeriod = this.period.split("-").length == 2;
      let pricesLength = 0;
      for (let i in this.prices) {
        if (Number(this.prices[i]) > 0) pricesLength++;
      }
      const isPrices = pricesLength >= this.capacity;

      return !(isPeriod && isPrices);
    },
  },
  methods: {
    sendForm() {
      const data = {
        period: this.period,
        prices: this.prices,
      };
      if (this.tariff) {
        data.index = this.tariff.index;
        this.$emit("updateTariff", data);
      } else {
        this.$emit("addTariff", data);
      }
      this.close();
    },
    close() {
      this.datepicker.clear();
      this.prices = {};
      this.$emit("close");
    },
  },
  mounted() {
    this.datepicker = new AirDatepicker(
      `#period-${this.datepickerToken} input`,
      {
        autoClose: true,
        minDate: new Date(),
        range: true,
        multipleDatesSeparator: " - ",
        onRenderCell: ({ date, cellType }) => {
          if (cellType === "day") {
            for (let i = 0; i < this.tariffs.length; i++) {
              const tariff = this.tariffs[i];

              if (this.tariff && this.tariff.period == tariff.period) continue;

              const arr = tariff.period.split("-").map((t) => t.trim());
              const start = this.$moment(arr[0], "DD.MM.YYYY");
              const end = this.$moment(arr[1], "DD.MM.YYYY");
              const isBetween = this.$moment(date).isBetween(
                start,
                end,
                undefined,
                "[]"
              );

              if (isBetween) {
                return {
                  disabled: true,
                  classes: "disabled-class",
                };
              }
            }
          }
        },
        onSelect: ({ formattedDate }) => {
          this.period = formattedDate.join(" - ");
        },
      }
    );
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
