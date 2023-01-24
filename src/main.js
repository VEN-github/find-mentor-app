import { createApp } from "vue";
import { Icon } from "@iconify/vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/main.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("Icon", Icon);

app.mount("#app");
