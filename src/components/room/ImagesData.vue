<template>
  <label class="upload">
    <span class="link">+ Добавить изображение</span>
    <input type="file" multiple accept="image/*" @change="addImage" />
  </label>

  <div v-if="images.length > 0" class="slider">
    <carousel :items-to-show="1" :wrap-around="true" v-model="currentSlide">
      <slide v-for="(src, index) in images" :key="index">
        <div class="slider__remove" @click="removeImage(index)">
          <img src="@/assets/img/icons/cross.svg" />
        </div>
        <img :src="src" class="slider__img" />
      </slide>
      <template #addons>
        <Pagination v-if="images.length > 1" />
      </template>
    </carousel>
    <AppCarouselNavigation v-if="images.length > 1" v-model="currentSlide" />
  </div>
  <p v-else>Изображений нет</p>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import AppCarouselNavigation from "@/components/app/AppCarouselNavigation";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    AppCarouselNavigation,
  },
  emits: ["updateFiles"],
  props: {
    files: Array,
  },
  data() {
    return {
      curFiles: this.files,
      images: [],
      currentSlide: 0,
    };
  },
  watch: {
    curFiles: {
      handler() {
        this.$emit("updateFiles", this.curFiles);
        this.filesToImages(this.curFiles);
      },
      deep: true,
    },
  },
  methods: {
    addImage(e) {
      let input = e.target;
      this.curFiles.push(...input.files);
      console.log(this.curFiles);

      input.value = "";
    },
    removeImage(index) {
      this.curFiles.splice(index, 1);
      this.currentSlide = Math.max(index - 1, 0);
    },
    filesToImages(files) {
      this.images = [];

      files.forEach((file) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = () => {
          this.images.push(fr.result);
        };
      });
    },
  },
  mounted() {
    this.filesToImages(this.files);
  },
};
</script>

<style lang="scss" scoped>
.upload {
  display: inline-block;
  margin-bottom: 20px;

  input {
    display: none;
  }
}
.slider {
  margin: 0 auto;
  max-width: 560px;

  &__img {
    border-radius: 12px;
  }

  &__remove {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 10;
    top: 15px;
    right: 15px;
    background: #fff;
    border-radius: 5px;
    opacity: 0.5;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 0 3px 1px #0000004d;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
