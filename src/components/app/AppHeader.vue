<template>
  <header id="app-header">
    <div class="container">
      <AppLogo />
      <div class="buttons">
        <button class="open-notifications">
          <IconNotifications />
        </button>

        <button class="open-chats">
          <IconChats />
        </button>

        <button
          class="open-profile show-drop-down-menu"
          :class="{ active: dropDownMenuIsShowed }"
          @click="showMenu()"
        >
          <IconProfile />
        </button>
      </div>
    </div>

    <AppDropDownMenu
      v-show="dropDownMenuIsShowed"
      :user="user"
      :show-modal="showModal"
    />

    <AppModal
      :showed="exitModalIsShowed"
      title="Выйти из профиля?"
      @close="hideModal()"
      class-name="exit-modal"
    >
      <div class="message">
        Вы действительно хотите выйти из вашего профиля?
      </div>

      <div class="buttons">
        <button class="no" @click="hideModal()">Отмена</button>
        <button class="yes">Выйти</button>
      </div>
    </AppModal>
  </header>
</template>

<script setup>
import AppLogo from "./AppLogo.vue";
import AppDropDownMenu from "./AppDropDownMenu.vue";
import AppModal from "./AppModal.vue";

import IconNotifications from "@/components/icons/IconNotifications.vue";
import IconChats from "@/components/icons/IconChats.vue";
import IconProfile from "@/components/icons/IconProfile.vue";
</script>

<script>
export default {
  data() {
    return {
      dropDownMenuIsShowed: false,
      user: {
        name: "Гетьман Михаил Евгеньевич",
      },
      exitModalIsShowed: false,
    };
  },

  methods: {
    showMenu() {
      this.dropDownMenuIsShowed = !this.dropDownMenuIsShowed;
      const handler = (e) => {
        if (e.target?.closest(".show-drop-down-menu")) return;

        this.dropDownMenuIsShowed = false;
        document.removeEventListener("click", handler);
      };

      document.addEventListener("click", handler);
    },

    showModal() {
      this.exitModalIsShowed = true;
    },

    hideModal() {
      this.exitModalIsShowed = false;
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/vars.scss";

.drop-down-menu-fade-enter-active,
.drop-down-menu-fade-leave-active {
  transition: opacity 100ms ease;
}

.drop-down-menu-fade-enter-from,
.drop-down-menu-fade-leave-to {
  opacity: 0;
}

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
        color: black !important;

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

.exit-modal {
  main {
    margin-top: 1em;
  }
  .buttons {
    display: flex;
    gap: 6%;
    margin-top: 1.5em;
    button {
      padding: 0.8em;
      font-size: 0.9em;
      border-radius: 15px;
      transition: 200ms ease all;
      width: 47%;
      cursor: pointer;
      &.no {
        background: rgb(215, 215, 215);
        &:hover {
          background: rgb(230, 230, 230);
        }
      }

      &.yes {
        background: vars.$negative_dark--color;
        color: vars.$negative_contrast--color;
        &:hover {
          background: vars.$negative--color;
        }
      }
    }
  }
}
</style>
