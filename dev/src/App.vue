<template>
  <AppHeader />

  <main id="app-content">

    <div class="container">
      <AppSideBar />
      <RouterView />
    </div>

  </main>

</template>



<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import AppHeader from './components/app/AppHeader.vue';
  import AppSideBar from "./components/app/AppSideBar.vue";
  import "./assets/styles/global.scss";
</script>

