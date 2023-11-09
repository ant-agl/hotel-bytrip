<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  components: {
    EmptyLayout,
    MainLayout,
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
