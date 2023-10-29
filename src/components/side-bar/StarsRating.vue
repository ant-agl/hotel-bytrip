<template>
  <div class="stars-rating">
    <div
      v-for="startNumber in 5"
      :key="startNumber"
      class="star"
      :class="{ filled: startNumber <= stars }"
    >
      <IconStar></IconStar>
    </div>
  </div>
</template>

<script>
import IconStar from "@/components/icons/IconStar.vue";

export default {
  data() {
    return {
      hotelName: "Отель смешарики",
      stars: 2,
    };
  },

  components: { IconStar },
};
</script>

<style scoped lang="scss">
$star--width: 20px;
.stars-rating {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.8rem;

  .star {
    aspect-ratio: 1;
    width: $star--width;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 100%;
      aspect-ratio: 1;
      fill: rgb(207, 207, 207);
    }

    &.filled {
      svg {
        fill: rgb(255, 196, 0);
      }
    }
  }
}
</style>
