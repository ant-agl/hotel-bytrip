<template>
  <AppContent
    :title="$route.params.id ? 'Редактирование номера' : 'Создание номера'"
    :isBack="true"
    backLink="/edit-room"
  >
    <AppTabs :tabs="tabs" v-model="activeTab" class="tabs" />

    <transition mode="out-in" name="show">
      <div :key="activeTab">
        <InfoData
          v-if="activeTab == 'info'"
          :info="info"
          @updateInfo="updateInfo"
        />
        <ImagesData
          v-if="activeTab == 'images'"
          :files="files"
          @updateFiles="updateFiles"
        />
        <ServicesData
          v-if="activeTab == 'services'"
          :services="curServices"
          @addService="addService"
          @removeService="removeService"
        />
        <TariffData
          v-if="activeTab == 'tariffs'"
          :tariffs="tariffs"
          :capacity="capacity"
          :discounts="discounts"
          :isChild="isChild"
          @addTariff="addTariff"
          @updateTariff="updateTariff"
          @deleteTariff="deleteTariff"
          @updateCapacity="updateCapacity"
          @addDiscount="addDiscount"
          @updateDiscount="updateDiscount"
          @deleteDiscount="deleteDiscount"
          @updateIsChild="updateIsChild"
        />
        <FeaturesData
          v-if="activeTab == 'features'"
          :features="features"
          @updateFeature="updateFeature"
        />
      </div>
    </transition>

    <div class="footer">
      <AppBtn @click="sendForm" :disabled="isDisabled">Создать</AppBtn>
    </div>
  </AppContent>
</template>

<script>
import AppContent from "@/components/app/AppContent";
import AppTabs from "@/components/app/AppTabs";
import AppBtn from "@/components/app/AppBtn";
import ServicesData from "@/components/room/ServicesData";
import InfoData from "@/components/room/InfoData";
import ImagesData from "@/components/room/ImagesData";
import TariffData from "@/components/room/TariffData";
import FeaturesData from "@/components/room/FeaturesData";

import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  components: {
    AppContent,
    AppTabs,
    AppBtn,
    ServicesData,
    InfoData,
    ImagesData,
    TariffData,
    FeaturesData,
  },
  data: () => ({
    tabs: [
      {
        id: "info",
        name: "Информация",
      },
      {
        id: "images",
        name: "Изображения",
      },
      {
        id: "services",
        name: "Услуги и удобства",
      },
      {
        id: "tariffs",
        name: "Тарифы",
      },
      {
        id: "features",
        name: "Особенности размещения",
      },
    ],
    activeTab: "info",
    curServices: {
      free: [],
      paid: [],
    },
    info: {
      countRoom: 1,
      name: "",
      group: "",
      description: "",
      feed: "",
      beds: {
        single: 0,
        double: 0,
        buck: 0,
      },
    },
    files: [],
    capacity: 1,
    tariffs: [],
    discounts: [],
    features: [],
    isChild: true,
  }),
  watch: {
    capacity(capacity) {
      this.tariffs.forEach((tariff) => {
        const count = Object.keys(tariff.prices).length;

        // добавление человек в цены
        for (let i = count + 1; i <= capacity; i++) {
          tariff.prices[i] = 0;
        }

        if (capacity == 0) return;
        // удаление людей из цен
        for (let i = count; i > capacity; i--) {
          delete tariff.prices[i];
        }
      });
    },
    discounts: {
      handler() {
        let from = 1;
        this.discounts.forEach((discount, i) => {
          discount.from = from;
          if (discount.to < from) discount.to = from;
          if (discount.to > 17) this.discounts.splice(i);
          from = discount.to + 1;
        });
      },
      deep: true,
    },
  },
  validations: () => ({
    info: {
      countRoom: { required, minValue: minValue(1) },
      name: { required },
    },
  }),
  computed: {
    isDisabled() {
      if (this.v$.$invalid) return true;
      return false;
    },
    beds() {
      let beds = [];
      for (let key in this.info.beds) {
        let count = this.info.beds[key];
        for (let i = 0; i < count; i++) {
          beds.push(key);
        }
      }
      return beds;
    },
    rates() {
      let rates = [];
      this.tariffs.forEach((tariff) => {
        const t = tariff.period.split("-").map((p) => p.trim());
        const start = this.$moment(t[0], "DD.MM.YYYY").unix();
        const end = this.$moment(t[1], "DD.MM.YYYY").unix();

        let cost = [];
        for (let person in tariff.prices) {
          cost.push({
            person,
            price: tariff.prices[person],
          });
        }

        rates.push({
          date: {
            input: start,
            output: end,
          },
          cost,
        });
      });

      return JSON.stringify(rates);
    },
    recordingPermission() {
      let recordingPermission = this.curServices.paid.map((s) => {
        switch (s.type) {
          case "once":
            return 1;
          case "in-day":
            return 0;
        }
      });
      return JSON.stringify(recordingPermission);
    },
  },
  methods: {
    updateInfo(data) {
      this.info = data;
    },
    updateFiles(files) {
      this.files = files;
    },
    addService(data) {
      if (data.isPaid) {
        this.curServices.paid.push({
          id: data.service,
          price: data.price,
          type: data.type,
        });
      } else {
        this.curServices.free.push(data.service);
      }
    },
    removeService(data) {
      let index;
      const type = data.free ? "free" : "paid";
      if (type == "free") {
        index = this.curServices[type].findIndex((s) => s == data.id);
      } else {
        index = this.curServices[type].findIndex((s) => s.id == data.id);
      }

      this.curServices[type].splice(index, 1);
    },
    addTariff(data) {
      this.tariffs.push(data);
    },
    updateTariff(data) {
      const index = data.index;
      delete data.index;
      this.tariffs[index] = data;
      console.log(this.tariffs);
    },
    deleteTariff(index) {
      this.tariffs.splice(index, 1);
    },
    updateCapacity(val) {
      this.capacity = val;
    },
    addDiscount(val) {
      this.discounts.push({
        from: val,
        to: val,
        value: 0,
      });
    },
    updateDiscount(data) {
      if (data.to !== undefined) this.discounts[data.index].to = data.to;
      if (data.value !== undefined)
        this.discounts[data.index].value = data.value;
    },
    deleteDiscount(index) {
      this.discounts.splice(index, 1);
    },
    updateFeature(data) {
      if (data.val) {
        this.features.push(data.id);
      } else {
        let index = this.features.findIndex((id) => id == data.id);
        this.features.splice(index, 1);
      }
    },
    updateIsChild(data) {
      console.log(data);
      this.isChild = data ? true : false;
    },
    sendForm() {
      const data = {
        count: this.info.countRoom,
        name: this.info.name,
        description: this.info.description,
        feed: this.info.feed,
        beds: JSON.stringify(this.beds),
        group: this.info.group,
        person: this.capacity,
        features: JSON.stringify(this.features),
        free: JSON.stringify(this.curServices.free),
        paid: JSON.stringify(this.curServices.paid.map((s) => s.id)),
        price: JSON.stringify(this.curServices.paid.map((s) => s.price)),
        recording_permission: this.recordingPermission,
        image: this.files[0],
        images: JSON.stringify(this.files),
        rates: this.rates,
        discounts: JSON.stringify(this.discounts),
        isChild: this.isChild ? 1 : 0,
      };
      console.log(data);

      this.$store.dispatch("addRoom", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  margin-bottom: 20px;
}
.footer {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
