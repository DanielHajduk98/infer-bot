import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/index.scss";

const vueApp = createApp(App)

import { createPinia } from "pinia";


vueApp.use(createPinia())
vueApp.mount("#app");
