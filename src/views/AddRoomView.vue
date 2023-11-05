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
        <div v-if="activeTab == 'tariffs'">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolorem
          nam, sit quibusdam numquam exercitationem ullam fugiat. Provident
          explicabo quasi reiciendis doloribus quam quisquam ipsa libero
          corrupti, illum, facilis aspernatur!
        </div>
      </div>
    </transition>

    <div class="footer">
      <AppBtn @click="sendForm" disabled>Создать</AppBtn>
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

export default {
  components: {
    AppContent,
    AppTabs,
    ServicesData,
    InfoData,
    ImagesData,
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
  }),
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
    sendForm() {
      //add_room.php
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
