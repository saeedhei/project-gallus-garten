// Tailwind CSS
import './style.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vAnimate from './directives/v-animate'

import TypingEffect from './components/atoms/texts/TypingEffect.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('animate', vAnimate)

app.component('TypingEffect', TypingEffect)

app.mount('#app')
