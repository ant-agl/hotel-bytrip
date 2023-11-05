<template>
  <form class="form">
    <AppInput
      v-model.number="countRoom"
      placeholder="Количество создаваемых номеров"
      title="Количество создаваемых номеров"
      @update:modelValue="emit"
    />
    <AppInput
      v-model="name"
      placeholder="Название номера"
      title="Название номера"
      @update:modelValue="emit"
    />
    <AppInput
      v-model="group"
      placeholder="Группа"
      title="Группа"
      @update:modelValue="emit"
    />
    <AppTextarea
      v-model="description"
      placeholder="Описание"
      title="Описание"
      @update:modelValue="emit"
    />
    <AppSelect
      v-model="feed"
      :list="feedList"
      placeholder="Питание"
      title="Питание"
      @update:modelValue="emit"
    />
    <AppInput
      type="number"
      v-model.number="beds.single"
      placeholder="Количество односпальных кроватей"
      title="Количество односпальных кроватей"
      @update:modelValue="emit"
    />
    <AppInput
      type="number"
      v-model.number="beds.double"
      placeholder="Количество двуспальных кроватей"
      title="Количество двуспальных кроватей"
      @update:modelValue="emit"
    />
    <AppInput
      type="number"
      v-model.number="beds.buck"
      placeholder="Количество двухъярусных кроватей"
      title="Количество двухъярусных кроватей"
      @update:modelValue="emit"
    />
  </form>
</template>

<script>
import AppInput from "@/components/app/AppInput";
import AppTextarea from "@/components/app/AppTextarea";
import AppSelect from "@/components/app/AppSelect";
import { mapGetters } from "vuex";

export default {
  components: { AppInput, AppTextarea, AppSelect },
  emits: ["updateInfo"],
  props: {
    info: Object,
  },
  data() {
    return {
      countRoom: this.info.countRoom,
      name: this.info.name,
      group: this.info.group,
      description: this.info.description,
      feed: this.info.feed,
      beds: {
        single: this.info.beds.single,
        double: this.info.beds.double,
        buck: this.info.beds.buck,
      },
    };
  },
  computed: {
    ...mapGetters(["servicesList"]),
    feedList() {
      let result = [];
      const servicesFeed = this.servicesList.filter(
        (s) => s.category == "Питание"
      );
      servicesFeed.forEach((s) => {
        result.push({
          id: s.id,
          label: s.name,
        });
      });
      return result;
    },
  },
  methods: {
    emit() {
      const data = {
        countRoom: this.countRoom,
        name: this.name,
        group: this.group,
        description: this.description,
        feed: this.feed,
        beds: this.beds,
      };
      this.$emit("updateInfo", data);
    },
  },
  mounted() {
    if (this.servicesList.length == 0) this.$store.dispatch("getServicesList");
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
}
</style>
