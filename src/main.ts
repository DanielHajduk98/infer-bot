import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

App.use(createPinia())

createApp(App).mount('#app')
