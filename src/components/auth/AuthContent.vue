<template>
  <div class="auth-content">
    <div class="auth-content__logo">
      <img src="@/assets/img/logo.svg" />
    </div>
    <h2 class="auth-content__title">{{ title }}</h2>
    <div class="auth-content__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["sendForm"],
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.auth-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  &__logo {
    width: 182px;
  }
  &__title {
    font-size: 20px;
    text-align: center;
  }
  &__body {
    width: 100%;
  }
}
</style>
