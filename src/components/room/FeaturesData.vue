<template>
  <AppLoad v-if="isLoading" />
  <div v-else class="features">
    <label
      v-for="feature in featuresList"
      :key="feature"
      class="features__item"
    >
      <AppCheckbox
        :value="feature.id"
        :modelValue="features.indexOf(feature.id) !== -1"
        @update:modelValue="
          $emit('updateFeature', { id: feature.id, val: $event })
        "
      />
      <span>{{ feature.name }}</span>
    </label>
  </div>
</template>

<script>
import AppLoad from "@/components/app/AppLoad.vue";
import AppCheckbox from "@/components/app/AppCheckbox.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    AppLoad,
    AppCheckbox,
  },
  emits: ["updateFeature"],
  props: {
    features: Array,
  },
  computed: {
    ...mapGetters(["featuresList"]),
  },
  data: () => ({
    isLoading: true,
  }),
  async mounted() {
    console.log(this.featuresList);
    if (this.featuresList.length == 0)
      await this.$store.dispatch("getFeatures");
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.features {
  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
