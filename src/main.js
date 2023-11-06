import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import moment from "moment";

let app = createApp(App).use(store).use(router);
app.config.globalProperties.$moment = moment;
app.mount("#app");
