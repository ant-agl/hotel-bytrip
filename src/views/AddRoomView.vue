<template>
  <AppContent
    :title="$route.params.id ? 'Редактирование номера' : 'Создание номера'"
    :isBack="true"
  ></AppContent>
</template>

<script>
import AppContent from "@/components/app/AppContent";

export default {
  components: { AppContent },
};
</script>
