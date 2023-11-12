<template>
  <Transition name="show" appear mode="out-in">
    <main id="app-content">
      <AppHeader />

      <div class="container">
        <AppSideBar />
        <router-view v-slot="{ Component, route }">
          <Transition name="show" appear mode="out-in">
            <div class="router-view" :key="route.name">
              <component :is="Component" />
            </div>
          </Transition>
        </router-view>
      </div>
    </main>
  </Transition>
</template>

<script setup>
import AppHeader from "@/components/app/AppHeader.vue";
import AppSideBar from "@/components/app/AppSideBar.vue";
</script>
