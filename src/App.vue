<template>
  <FastNotificationsPlugin />

  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import FastNotificationsPlugin from "@/plugins/FastNotificationsPlugin.vue";

export default {
  components: {
    EmptyLayout,
    MainLayout,
    FastNotificationsPlugin,
  },
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
