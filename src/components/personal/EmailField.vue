<template>
  <InputField
    fieldId="email"
    type="email"
    placeholder="Почта"
    title="Почта"
    v-bind="$props"
  >
    <template v-slot:button>
      <button class="action-button">Подтвердить</button>
    </template>
  </InputField>
</template>

<script setup>
import InputField from "./InputField.vue";
</script>
