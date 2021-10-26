import { createApp } from "vue";
import App from "./App.vue";

const vueApp = createApp(App)

import { createPinia } from "pinia";


vueApp.use(createPinia())
vueApp.mount("#app");
