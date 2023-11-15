<template>
  <main class="router-view">Главная</main>

  <button
    @click="this.$message({ message: 'Сообщение об ошибке', type: 'error' })"
  >
    Сообщение об ошибке
  </button>
  <button
    @click="this.$message({ message: 'Другое сообщение', type: 'success' })"
  >
    Сообщение об чем-то ином
  </button>

  <div class="test">
    <IconHint
      v-hint="
        `ПРЛФОООООООООООООООООООООООООООООООО kaskjfhahj w ciuvbjha
        ajskhfashkflw asfoe ajihgiuyafbihaf a
        `
      "
    />
  </div>
</template>

<script setup>
import IconHint from "@/components/icons/IconHint.vue";
</script>
