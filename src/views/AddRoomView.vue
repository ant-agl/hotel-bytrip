<template>
  <AppContent
    :title="$route.params.id ? 'Редактирование номера' : 'Создание номера'"
    :isBack="true"
    backLink="/edit-room"
  >
    <AppTabs :tabs="tabs" v-model="activeTab" class="tabs" />

    <transition mode="out-in" name="show">
      <div :key="activeTab">
        <div v-if="activeTab == 'info'">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde amet
          perferendis nostrum officiis iusto omnis ab ducimus! Ad,
          exercitationem rerum?
        </div>
        <div v-else-if="activeTab == 'images'">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          quasi ex libero quam ducimus. Odio natus laudantium molestiae, dolorem
          dolorum doloremque repudiandae est maiores excepturi, sequi omnis
          magnam officia, quis sed qui. Quos inventore illo quae dolorem nisi
          dignissimos accusantium!
        </div>
        <ServicesData
          v-else-if="activeTab == 'services'"
          @addService="addService"
        />
        <div v-else-if="activeTab == 'tariffs'">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolorem
          nam, sit quibusdam numquam exercitationem ullam fugiat. Provident
          explicabo quasi reiciendis doloribus quam quisquam ipsa libero
          corrupti, illum, facilis aspernatur!
        </div>
      </div>
    </transition>

    <div class="footer">
      <AppBtn>Создать</AppBtn>
    </div>
  </AppContent>
</template>

<script>
import AppContent from "@/components/app/AppContent";
import AppTabs from "@/components/app/AppTabs";
import AppBtn from "@/components/app/AppBtn";
import ServicesData from "@/components/room/ServicesData";

export default {
  components: { AppContent, AppTabs, ServicesData, AppBtn },
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
  }),
  methods: {
    addService(data) {
      console.log(2, data);
    },
    sendForm() {
      //add_room.php
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
