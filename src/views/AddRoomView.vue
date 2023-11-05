<template>
  <AppContent
    :title="$route.params.id ? 'Редактирование номера' : 'Создание номера'"
    :isBack="true"
    backLink="/edit-room"
  >
    <AppTabs :tabs="tabs" v-model="activeTab" class="tabs" />

    <transition>
      <ServicesData v-if="activeTab == 'services'" />
      <div v-else-if="activeTab == 'tariffs'">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolorem
        nam, sit quibusdam numquam exercitationem ullam fugiat. Provident
        explicabo quasi reiciendis doloribus quam quisquam ipsa libero corrupti,
        illum, facilis aspernatur!
      </div>
      <div v-else-if="activeTab == 'images'">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quasi
        ex libero quam ducimus. Odio natus laudantium molestiae, dolorem dolorum
        doloremque repudiandae est maiores excepturi, sequi omnis magnam
        officia, quis sed qui. Quos inventore illo quae dolorem nisi dignissimos
        accusantium!
      </div>
      <div v-else-if="activeTab == 'info'">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde amet
        perferendis nostrum officiis iusto omnis ab ducimus! Ad, exercitationem
        rerum?
      </div>
    </transition>

    <div class="footer">
      <AppBtn>Сохранить</AppBtn>
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
        id: "services",
        name: "Услуги и удобства",
      },
      {
        id: "tariffs",
        name: "Тарифы",
      },
      {
        id: "images",
        name: "Изображения",
      },
      {
        id: "info",
        name: "Информация",
      },
    ],
    activeTab: "services",
  }),
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
}
.v-enter-active {
  transition: opacity 0.4s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  position: absolute;
}
</style>
