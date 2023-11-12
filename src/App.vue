<template>
  <FastNotificationsPlugin />

  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import FastNotificationsPlugin from "@/plugins/FastNotificationsPlugin.vue";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    },
  },
  components: {
    MainLayout,
    FastNotificationsPlugin,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
