<template>
  <label class="checkbox" :class="{ active: modelValue }">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </label>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: var(--gray);
  transition: 0.2s;
  position: relative;
  cursor: pointer;

  input {
    display: none;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    height: 3px;
    width: 6px;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    transition: 0.2s;
    top: 6px;
    left: 5px;
    opacity: 0;
    transform: rotate(-45deg);
  }

  &.active {
    background-color: var(--color-primary);
    &::after {
      opacity: 1;
    }
  }
}
</style>
