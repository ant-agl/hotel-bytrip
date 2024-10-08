<template>
  <Transition name="modal-container-fade">
    <div id="modal-container" v-show="$props.showed">
      <Transition name="modal-fade">
        <div class="modal" :class="[size, className]" v-show="$props.showed">
          <header>
            <div class="title">{{ title }}</div>
            <button class="close" @click.prevent="hideModal()">
              <img src="@/assets/img/icon_close_thin.svg" />
            </button>
          </header>

          <main class="body">
            <slot name="body"></slot>
          </main>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
import { Transition } from "vue";

export default {
  props: ["size", "className", "title", "showed"],
  methods: {
    hideModal() {
      this.$emit("close");
    },

    switchOverflowY() {
      document.body.style.overflowY = this.$props.showed ? "hidden" : "auto";
    },
  },

  components: { Transition },

  mounted() {
    this.switchOverflowY();
  },

  updated() {
    this.switchOverflowY();
  },
};
</script>

<style scoped lang="scss">
.modal-fade-enter-active {
  transition: 0.2s all ease-in;
}

.modal-fade-leave-active {
  transition: 0.2s all ease-out;
  scale: 0.9;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  scale: 0.9;
  opacity: 0;
}

.modal-container-fade-enter-active,
.modal-container-fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.modal-container-fade-enter-from,
.modal-container-fade-leave-to {
  opacity: 0;
}

#modal-container {
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 9999;
  height: 100%;
  background: rgba(0, 0, 0, 0.245);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    background: white;
    border-radius: 10px;
    min-width: 60vh;
    padding: 1.2em;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-weight: 600;
      }

      .close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        cursor: pointer;
        transition: 200ms ease all;
        &:hover {
          opacity: 0.4;
        }

        img {
          width: 100%;
          aspect-ratio: 1;
        }
      }
    }
  }
}
</style>
