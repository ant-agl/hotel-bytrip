<template>
  <div id="fast-notifications-container">
    <TransitionGroup>
      <div
        v-for="notification in notifications"
        :key="notification.key"
        class="fast-notification"
        :class="notification.type"
      >
        <div class="type-icon">
          <img :src="getIcon(notification.type)" alt="" class="svg-icon" />
        </div>
        <div class="message">
          {{ notification.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["showNotification"]),

    getIcon(type) {
      let filename = type == "error" ? "icon_cross.svg" : "icon_arrow.svg";
      return `/img/${filename}`;
    },
  },

  computed: {
    notifications() {
      return this.$store.getters.notifications;
    },
  },

  mounted() {
    this.showNotification({
      type: "error",
      message: "Ошибка",
    });

    this.showNotification({
      type: "default",
      message: "Ошибка",
    });
  },
};
</script>

<style scope lang="scss">
@use "@/assets/styles/vars.scss";
$type_icon--width: 15px;

.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 0.7s;
}
.v-leave-active {
  position: absolute;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}

#fast-notifications-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99999;

  .fast-notification {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: white;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.9em;
    width: auto;
    align-self: center;
    box-shadow: 0 0 10px #00000038;
    transition: 300ms ease all;

    .type-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $type_icon--width;
      aspect-ratio: 1;
      line-height: $type_icon--width;
      border-radius: 100%;

      .svg-icon {
        width: 50%;
        aspect-ratio: 1;
      }
    }

    &.error {
      .type-icon {
        background: rgb(168, 38, 38);
      }
    }

    &.default,
    &.success {
      .type-icon {
        background: rgb(35, 126, 48);
      }
    }
  }
}
</style>
