// Tailwind CSS
import './style.css'
import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import specific icons (choose what you need)
import {
  faUser,
  faBookOpen,
  faUsers,
  faSeedling,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faUser, faEnvelope, faGithub, faBookOpen)

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import VueKonva from 'vue-konva'

library.add(faUser, faEnvelope, faGithub, faUsers, faSeedling)

import App from './App.vue'
import router from './router'

import vAnimate from './directives/v-animate'

import TypingEffect from './components/atoms/texts/TypingEffect.vue'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)
app.use(VueKonva)

app.directive('animate', vAnimate)

app.component('TypingEffect', TypingEffect)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
