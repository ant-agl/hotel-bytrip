<template>
  <div class="navigation">
    <input type="hidden" value="modelValue" />
    <button
      @click.prevent="$emit('update:modelValue', modelValue - 1)"
      class="navigation__arrow"
    >
      <img src="@/assets/img/icons/arr-left.png" />
    </button>
    <button
      @click.prevent="$emit('update:modelValue', modelValue + 1)"
      class="navigation__arrow"
    >
      <img src="@/assets/img/icons/arr-right.png" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  gap: 15px;
  margin-top: 5px;

  &__arrow {
    width: 18px;
    opacity: 0.5;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
