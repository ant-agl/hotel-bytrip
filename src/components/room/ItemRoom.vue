<template>
  <div class="item-room">
    <div class="item-room__body">
      <div class="item-room__slider">
        <carousel :items-to-show="1" :wrap-around="true" v-model="currentSlide">
          <slide v-for="src in room.images" :key="src">
            <img :src="src" class="item-room__slide" />
          </slide>
        </carousel>
        <AppCarouselNavigation v-model="currentSlide" />
      </div>

      <div class="item-room__main">
        <h4 class="item-room__title">{{ room.title }}</h4>
        <p class="item-room__desc">{{ room.desc }}</p>
      </div>

      <div class="item-room__list">
        <div
          class="item-room__list-item"
          v-for="item in room.list"
          :key="item.name"
        >
          <b>{{ item.name }}:</b><br />
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="item-room__footer">
      <router-link :to="'/edit-room/' + room.id" class="link">
        Редактировать
      </router-link>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import AppCarouselNavigation from "@/components/app/AppCarouselNavigation";

export default {
  components: {
    Carousel,
    Slide,
    AppCarouselNavigation,
  },
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    currentSlide: 0,
  }),
};
</script>

<style lang="scss" scoped>
.item-room {
  border-top: 1px solid #ddd;
  padding: 20px 0;

  &__body {
    display: flex;
    gap: 15px;
  }
  &__slider {
    width: 30%;
  }
  &__main {
    width: 45%;
  }
  &__list {
    width: 25%;

    &-item {
      margin-bottom: 10px;
    }
  }
  &__slide {
    border-radius: 15px;
    overflow: hidden;
  }
  &__title {
    margin-bottom: 10px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 10px;
  }
}
</style>
