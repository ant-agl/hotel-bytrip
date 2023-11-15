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
const NOTIFICATION_LIVE_MS = 3000;
const STEP_MS = 10;

let milliseconds = 0;
let timer = null;

export default {
  data() {
    return {
      notifications: [],
    };
  },

  methods: {
    getIcon(type) {
      let filename = type == "error" ? "icon_cross.svg" : "icon_arrow.svg";
      return `/img/${filename}`;
    },
  },

  mounted() {
    let notificationsQueue = [];

    const showNotification = (event) => {
      let { notification } = event.detail;
      let key = "k-" + Math.random();
      notification.key = key;
      notification.timeout = milliseconds + NOTIFICATION_LIVE_MS;

      notificationsQueue.push(notification);
      this.notifications.push(...notificationsQueue);
      notificationsQueue = [];

      if (!timer) {
        timer = setInterval(() => {
          if (this.notifications[0].timeout <= milliseconds) {
            this.notifications.shift();
          }

          if (this.notifications.length == 0) {
            clearInterval(timer);
            timer = null;
            return;
          }

          milliseconds += STEP_MS;
        }, STEP_MS);
      }

      this.$forceUpdate();
    };

    document.addEventListener("new_fast_notification", showNotification);
  },
  updated() {
    //prevent sizes changes of disappering fast notification
    this.$el.style.width = "auto";
    let maxWidth = this.$el.scrollWidth + 10;
    this.$el.style.width = maxWidth + "px";
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
  cursor: pointer;
  user-select: none;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99999;

  .fast-notification {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    gap: 10px;
    background: white;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.9em;
    box-shadow: 0 0 10px #00000038;
    transition: 300ms ease all;

    .type-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $type_icon--width;
      aspect-ratio: 1;

      .svg-icon {
        width: 100%;
        aspect-ratio: 1;
      }
    }
  }
}
</style>
