const NOTIFICATION_LIVE_MS = 3000;
const STEP_MS = 10;

let milliseconds = 0;
let timer = null;

export default {
  state: {
    notifications: [],
  },
  getters: {
    notifications: (s) => s.notifications,
  },
  mutations: {
    showNotification: (s, notification) => {
      let key = s.notifications.length;
      notification.key = key;
      notification.timeout = milliseconds + NOTIFICATION_LIVE_MS;
      s.notifications.push(notification);

      if (!timer) {
        timer = setInterval(() => {
          if (s.notifications[0].timeout <= milliseconds) {
            s.notifications.shift();
          }

          if (s.notifications.length == 0) {
            clearInterval(timer);
            timer = null;
            return;
          }

          milliseconds += STEP_MS;
        }, STEP_MS);
      }
    },
  },
  actions: {
    /**
     * @param {*} notification - params of  notification
     * @param {string} notification.type - ["error"|"default"]
     * @param {string} notification.message - content of notification
     */
    showNotification(context, notification) {
      context.commit("showNotification", notification);
    },
  },
};
