<template>

  <Transition name="drop-down-menu-fade">
    <div id="app-drop-down-menu">

      <router-link to="/personal" class="open-profile">
        {{ user.name }}
      </router-link>

      <a class="exit" @click="showModal()">Выйти</a>


      <AppModal 
        :showed="exitModalIsShowed" 
        v-bind:title=" `Выйти из профиля?` "
        @close="hideModal()"
        class-name="exit-modal">

        <template v-slot:body>
          <div class="message">Вы действительно хотите выйти из вашего профиля?</div>

          <div class="buttons">
            <button class="no" @click="hideModal()">Отмена</button>
            <button class="yes">Выйти</button>
          </div>
        </template>


      </AppModal>

    </div>
  </Transition>

</template>


<script setup lang="ts">
  import AppModal from './AppModal.vue';
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
        
        this.$el.style.top = (Number(offsetTop) - 10) + 'px'
        this.$el.style.right = (offsetRight + 20) + 'px'
      }
    }
  }
</script>



<style lang="scss">
  @use "../../assets/styles/vars.scss";


  #app-drop-down-menu {
    position: absolute;
    background: white;
    box-shadow: 0 0 3px 1px #0000004d;
    width: 200px;
    border-radius: 10px;
    overflow: hidden;

    & > a {
      padding: .4em 1.3em;
      font-size: .8em;
      line-height: 1.4em;
      width: 100%;
      text-decoration: none;
      &:visited {color: inherit}

      display: flex;
      gap: .5em;
      align-items: center;
      text-align: left;
      transition: 200ms ease all;
      height: 44px;
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

    .buttons {
      display: flex;
      gap: 6%;
      margin-top: 2em;
     
      button {
        padding: .8em;
        font-size: .9em;
        border-radius: 15px;
        transition: 200ms ease all;
        width: 47%;
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