import { createRouter, createWebHistory } from "vue-router";

import Results from "../views/Results.vue";
import Chatbot from "../views/Chatbot.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Chatbot },
    { path: "/results", component: Results },
  ],
});

export default router;
