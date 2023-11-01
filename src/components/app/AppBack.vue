<template>
  <a @click.prevent="link ? $router.push(link) : $router.back()" class="link">
    <img src="@/assets/img/back.svg" />
    <span>Назад</span>
  </a>
</template>

<script>
export default {
  props: {
    link: String,
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  position: absolute;
}
</style>
