<template>
  <div class="content">
    <AppBack v-if="isBack" :link="backLink" />
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
import AppBack from "@/components/app/AppBack.vue";

export default {
  components: { AppBack },
  props: {
    title: String,
    isBack: Boolean,
    backLink: String,
  },
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  width: 100%;

  h2 {
    margin-bottom: 20px;
  }
}
</style>
