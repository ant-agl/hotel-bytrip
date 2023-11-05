<template>
  <div class="accordion">
    <div
      v-for="item in list"
      :key="item.id"
      class="accordion__item"
      :class="{ active: item.id == activeId }"
    >
      <div class="accordion__title">
        <span>{{ item.title }}</span>
        <div class="accordion__icon"></div>
      </div>
      <div class="accordion__content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    activeId: [String, Number],
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  &__item {
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    cursor: pointer;
  }
  &__icon {
    width: 18px;
    height: 18px;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 2px;
      width: 18px;
      transform-origin: center;
      top: 8px;
      left: 0;
      transition: 0.2s;
    }
    &::after {
      transform: rotate(90deg);
    }
  }
  &__content {
    overflow: hidden;
    height: 0;
  }

  &.active &__icon {
    &::after {
      transform: rotate(0);
    }
  }
  &.active &__content {
    height: auto;
  }
}
</style>
