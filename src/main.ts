import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './index.css'
import router from './router'

import vAnimate from './directives/v-animate';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('animate', vAnimate);

app.mount('#app')
