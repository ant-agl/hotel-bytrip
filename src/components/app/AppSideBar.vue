<template>
  <aside id="side-bar">
    <div class="hotel-photo"></div>

    <h2 class="hotel-name">{{ hotelName }}</h2>

    <StarsRating></StarsRating>

    <AppNavbar></AppNavbar>
  </aside>
</template>

<script setup>
import StarsRating from "@/components/side-bar/StarsRating.vue";
import AppNavbar from "./AppNavbar.vue";
</script>

<script>
export default {
  data() {
    return {
      hotelName: "Отель смешарики",
    };
  },
};
</script>

<style scoped lang="scss">
@use "../../assets/styles/vars.scss";

#side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  max-width: vars.$side_bar--width;
  padding: 0.8rem;
  background: white;
  align-self: start;

  .hotel-photo {
    width: 100%;
    aspect-ratio: 2;
    border-radius: 10px;
    background: {
      image: url("../../assets/img/400x200.svg");
      position: center;
      size: cover;
    }
  }
}
</style>
