<template>
  <AppHeader />

  <main id="app-content">
    <div class="container">
      <AppSideBar />
      <router-view v-slot="{ Component, route }">
        <Transition appear>
          <component :is="Component" :key="route.name" />
        </Transition>
      </router-view>
    </div>
  </main>
</template>

<script setup>
import AppHeader from "@/components/app/AppHeader.vue";
import AppSideBar from "@/components/app/AppSideBar.vue";
import "@/assets/styles/global.scss";
</script>

<style lang="scss" scoped>
.v-enter-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-from {
  opacity: 0;
}
</style>
