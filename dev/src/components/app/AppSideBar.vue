<script setup lang="ts">
  import StarsRating from "../side-bar/StarsRating.vue";
  import AppNavbar from "./AppNavbar.vue";
</script>



<script lang="ts">

  export default {
    data() {
      return {
        hotelName: "Отель смешарики"
      }
    }
  }

</script>


<template>
  <aside id="side-bar">

    <div class="hotel-photo"></div>

    <h2 class="hotel-name">{{ hotelName }}</h2>

    <StarsRating></StarsRating>

    <AppNavbar></AppNavbar>

  </aside>
</template>



<style scoped lang="scss">
  @use "../../assets/styles/vars.scss";

  #side-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    border-radius: 1.5em;
    max-width: vars.$side_bar--width;
    padding: .8rem;
    background: white;
    align-self: start;

    .hotel-photo {
      width: 100%;
      aspect-ratio: 2;
      border-radius: 1em;
      background: {
        image: url('../../assets/img/400x200.svg');
        position: center;
        size: cover;
      };
    }
  }

</style>