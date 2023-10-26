<script setup lang="ts">
  import AppLogo from "./AppLogo.vue";
  import AppDropDownMenu from "./AppDropDownMenu.vue";

  import IconNotifications from "../icons/IconNotifications.vue";
  import IconChats from "../icons/IconChats.vue";
  import IconProfile from "../icons/IconProfile.vue";
  
</script>



<script lang="ts">

  export default {
    data() {
      return {
        dropDownMenuIsShowed: false,
        user: {name: "Гетьман Михаил Евгеньевич"}
      }
    },

    methods: {
      showMenu() {
        this.dropDownMenuIsShowed = !this.dropDownMenuIsShowed
        
        const handler = (e:any) => {
          if(e.target?.closest("#app-drop-down-menu") || 
             e.target?.closest(".show-drop-down-menu") ) return;

          this.dropDownMenuIsShowed = false;
          document.removeEventListener('click', handler);
        }

        document.addEventListener('click', handler)
      }
    }
  }

</script>



<template>
  
  <header id="app-header">

    <div class="container">
      <AppLogo></AppLogo>  
    
      <div class="buttons">
        <button class="open-notifications">
          <IconNotifications/>
        </button>

        <button class="open-chats">
          <IconChats/>
        </button>

        <button 
          class="open-profile show-drop-down-menu" 
          :class="{active: dropDownMenuIsShowed}"
          @click="showMenu()">
          <IconProfile/>
        </button>

      </div>
    </div>

    <AppDropDownMenu v-if="dropDownMenuIsShowed" v-bind="{user}"/>

  </header>
</template>



<style scoped lang="scss">

  @use "../../assets/styles/vars.scss";

  #app-header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    background: white;
    height: vars.$app_header--height;
    box-shadow: 0 20px 30px #0000004d;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;

    & > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    
      & > .buttons {
        display: flex;
        align-items: center;

        height: 100%;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          height: 100%;
          aspect-ratio: 1;
          padding: 8%;
          transition: 400ms ease all;

          &.open-chats:hover {
            animation: points-animation;
          }

          &.active {
            background: rgb(235, 235, 235);
            border-radius: 100%;
          }
        }

      }
    }
  }

</style>