<template>
  <div class="field">
    <label>Двойная аутентификация</label>

    <CustomSelect
      :options="$data.options"
      class="field"
      name="doubleAuth"
      @change="$props.onChange($event)"
    />
  </div>
</template>

<script setup>
import CustomSelect from "@/components/CustomSelect.vue";
</script>

<script>
export default {
  data() {
    return {
      options: [
        ["none", "Не выбрано"],
        ["phone", "Номер телефона"],
        ["email", "Адрес электронной почты"],
      ],
    };
  },

  props: ["onChange"],
};
</script>
