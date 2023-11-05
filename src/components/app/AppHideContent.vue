<template>
  <div class="hide-content" :class="{ active: isOpen }">
    <div class="hide-content__head" @click="toggleContent">
      <h6 class="hide-content__title">{{ title }}</h6>
      <div class="hide-content__icon"></div>
    </div>
    <div class="hide-content__body" ref="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    open: Boolean,
  },
  data() {
    return {
      isOpen: this.open,
      interval: false,
      height: 0,
    };
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen;
      this.calcHeight();
    },
    calcHeight() {
      let maxHeight = 0;
      if (this.isOpen) {
        const children = this.$refs.body.children;
        for (let i = 0; i < children.length; i++) {
          maxHeight += children[i].clientHeight;
        }
      }

      if (maxHeight != this.height) {
        this.$refs.body.style.maxHeight = maxHeight + "px";
        this.height = maxHeight;
      }
    },
  },
  mounted() {
    if (this.open) this.calcHeight();

    this.interval = setInterval(this.calcHeight, 100);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.hide-content {
  &__head {
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: 0.2s;

    &:hover {
      background-color: var(--gray);
    }
  }
  &__title {
    font-size: 16px;
  }
  &__icon {
    width: 14px;
    height: 14px;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      display: block;
      background-color: var(--color-text);
      height: 2px;
      width: 14px;
      transform-origin: center;
      top: 6px;
      left: 0;
      transition: 0.2s;
    }
    &::after {
      transform: rotate(90deg);
    }
  }
  &__body {
    overflow: hidden;
    transition: 0.3s;
    max-height: 0;
  }
  &.active &__icon {
    &::after {
      transform: rotate(0);
    }
  }
}
</style>
