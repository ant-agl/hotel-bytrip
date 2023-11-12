import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import moment from "moment";
import { directive as hintDirective } from "./directives/hint";

import FastNotificationsPlugin from "@/plugins/FastNotificationsPlugin.vue";

console.log(FastNotificationsPlugin);

let app = createApp(App).use(store).use(router);
app.use(FastNotificationsPlugin);

app.directive("hint", hintDirective);
app.config.globalProperties.$moment = moment;
app.mount("#app");
