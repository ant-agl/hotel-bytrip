<script setup lang="ts">
  import { Transition } from 'vue';
  import Modal from '../Modal.vue';
  import IconExit from '../icons/IconExit.vue';
  import IconProfileVue from '../icons/IconProfile.vue';
</script>



<script lang="ts">

  export default {
    props: ['user'],

    data() {
      return {
        exitModalIsShowed: false
      }
    },

    mounted() {
      this.fitPositions();
      window.addEventListener("resize", this.fitPositions)
    },

    unmounted() {
      window.removeEventListener("resize", this.fitPositions)
    },


    methods: {
      showModal() {
        this.exitModalIsShowed = true
      },

      hideModal() {
        this.exitModalIsShowed = false
      },

      fitPositions() {
        let headerContainer = document.querySelector("#app-header .container")
        let headerContainerCors = headerContainer?.getBoundingClientRect();

        let offsetTop = headerContainerCors?.height;
        let offsetRight = document.documentElement.clientWidth - Number(headerContainerCors?.right);
        
        this.$el.style.top = offsetTop + 'px'
        this.$el.style.right = offsetRight + 'px'
      }
    }
  }
</script>



<template>

  <div id="app-drop-down-menu">
    <button class="open-profile">

      <div class="icon">
        <IconProfileVue />
      </div>

      <span>{{ user.name }}</span>

    </button>


    <button class="exit" @click="showModal()">

      <div class="icon">
        <IconExit />
      </div>

      <span>Выйти</span>

    </button>


          
    <Transition name="modal-fade">
      <Modal v-if="exitModalIsShowed" 
        @close="hideModal()"
        class-name="exit-modal">

        <template v-slot:header>
          <span class="title">Выйти из профиля?</span>
        </template>

        <template v-slot:body>
          <div class="message">Вы действительно хотите выйти из вашего профиля?</div>

          <div class="buttons">
            <button class="no" @click="hideModal()">Отмена</button>
            <button class="yes">Выйти</button>
          </div>
        </template>


      </Modal>
    </Transition>

  </div>

</template>



<style lang="scss">
  @use "../../assets/styles/vars.scss";

  
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  } 

  #app-drop-down-menu {
    position: absolute;
    background: white;
    box-shadow: 0 20px 40px #0000004d;
    width: 280px;
    border-radius: 0 0 15px 15px;
    overflow: hidden;

    & > button {
      padding: .4em 1em;
      font-size: .95em;
      width: 100%;

      display: flex;
      gap: .5em;
      align-items: center;
      text-align: left;
      line-height: 1.5em;
      transition: 200ms ease all;
      height: 56px;
      cursor: pointer;

      &:hover {
        background: rgb(221, 221, 221);
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 30px;
          aspect-ratio: 1;
        }

      }
    }
  }

  .exit-modal {
    
    .title {
      font-weight: bold;
    }

    .buttons {
      display: flex;
      gap: 1%;
      margin-top: 1.5em;
     
      button {
        padding: .8em;
        font-size: .9em;
        border-radius: 15px;
        transition: 200ms ease all;
        width: 49%;
        cursor: pointer;
      
        &.no {
          background: rgb(215, 215, 215);
          &:hover {background: rgb(230, 230, 230)}
        }

        &.yes {
          background: vars.$negative_dark--color;
          color: vars.$negative_contrast--color;
          &:hover {background: vars.$negative--color}
        }
      }


    }
  }
</style>