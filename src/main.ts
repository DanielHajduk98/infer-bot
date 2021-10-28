import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import Results from "./Results.vue";
import Chatbot from "./Chatbot.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Chatbot },
    { path: "/result", component: Results },
  ],
});

const vueApp = createApp(App);
vueApp.use(router);
vueApp.use(createPinia());
vueApp.mount("#app");
