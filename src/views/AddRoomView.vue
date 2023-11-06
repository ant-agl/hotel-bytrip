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
          @addTariff="addTariff"
          @updateTariff="updateTariff"
          @deleteTariff="deleteTariff"
          @updateCapacity="updateCapacity"
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

import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  components: {
    AppContent,
    AppTabs,
    ServicesData,
    InfoData,
    ImagesData,
    TariffData,
    AppBtn,
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
    sendForm() {
      //add_room.php
      // const data = {
      //   number: this.
      // }
      console.log("send");
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
