<template>
  <AppModal :showed="isActive" title="Добавить услугу" @close="close">
    <form class="form">
      <AppSelect
        v-model="serviceValue"
        :list="servicesListSelect"
        isSearch
        placeholder="Выберите услугу"
      />
      <label class="label">
        <span>Платная услуга</span>
        <AppCheckbox v-model="isPaid" />
      </label>

      <transition name="show">
        <div v-if="isPaid" class="paid-block">
          <AppInput
            type="number"
            v-model.number="price"
            placeholder="Стоимость"
            title="Стоимость, руб."
          />
          <AppSelect
            v-model="typeService"
            :list="typesServices"
            placeholder="Тип услуги"
            title="Тип услуги"
          />
        </div>
      </transition>
    </form>

    <template v-slot:footer>
      <AppBtn @click.prevent="sendForm" :disabled="isDisabled">Добавить</AppBtn>
    </template>
  </AppModal>
</template>

<script>
import AppModal from "@/components/app/AppModal";
import AppSelect from "@/components/app/AppSelect";
import AppInput from "@/components/app/AppInput";
import AppBtn from "@/components/app/AppBtn";
import AppCheckbox from "@/components/app/AppCheckbox";

import { mapGetters } from "vuex";

export default {
  components: { AppModal, AppSelect, AppInput, AppBtn, AppCheckbox },
  emits: ["addService", "close"],
  props: {
    isActive: Boolean,
  },
  data: () => ({
    serviceValue: "",
    isPaid: false,
    price: "",
    typeService: "once",
    typesServices: [
      {
        id: "once",
        label: "Единоразовая",
      },
      {
        id: "in-day",
        label: "Стоимость в сутки",
      },
    ],
  }),
  computed: {
    ...mapGetters(["servicesList"]),
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
    isDisabled() {
      return this.serviceValue == "" || (this.isPaid && this.price <= 0);
    },
  },
  mounted() {
    if (this.servicesList.length == 0) this.$store.dispatch("getServicesList");
  },
  methods: {
    sendForm() {
      const data = {
        service: this.serviceValue,
        isPaid: this.isPaid,
        price: this.price,
        type: this.typeService,
      };
      this.$emit("addService", data);
      this.close();
    },
    close() {
      this.serviceValue = "";
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.form,
.paid-block {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
</style>
