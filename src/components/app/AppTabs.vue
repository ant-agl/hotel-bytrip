<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="tab in tabs"
      :key="tab.id"
      :class="{ active: modelValue == tab.id }"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    modelValue: String,
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}
.tab {
  border-radius: 100px;
  cursor: pointer;
  background-color: var(--color-bg);
  font-size: 13px;
  padding: 6px 15px;
  transition: 0.2s;

  &:not(.active):hover {
    background-color: var(--gray);
  }
  &.active {
    background-color: var(--color-primary);
    color: var(--color-bg);
  }
}
</style>
