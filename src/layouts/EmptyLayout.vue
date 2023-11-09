<template>
  <div class="empty-layout">
    <router-view v-slot="{ Component, route }">
      <Transition name="show" appear mode="out-in">
        <div class="empty-layout__content" :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.empty-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 20px;

  &__content {
    border-radius: 20px;
    background-color: #fff;
    padding: 40px;
    min-width: 600px;
    max-width: 600px;
    height: auto;
  }
}
</style>
