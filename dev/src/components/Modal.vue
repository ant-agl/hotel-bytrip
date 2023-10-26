<script lang="ts">
  import { Transition } from 'vue';

  export default {
    props: ['size', 'className'],
    methods: {
        hideModal() {
          this.$emit("close");
        }
    },
    components: { Transition }
}

</script>


<template>

  <div id="modal-container">

    <div class="modal" :class="[size, className]">
      
      <header>
        <slot name="header"></slot>
        <button class="close" @click="hideModal()">
          <img src="/src/assets/img/icon_close_thin.svg">
        </button>
      </header>

      <main class="body">
        <slot name="body"></slot>
      </main>
    
    </div>

  </div>

</template>

<style scoped lang="scss">

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
      display: flex;
      flex-direction: column;
      gap: 1em;
      background: white;
      border-radius: 10px;
      min-width: 60vh;
      min-height: 6em;
      padding: 1em;

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          cursor: pointer;
          transition: 200ms ease all;
          &:hover {
            opacity: .4;
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