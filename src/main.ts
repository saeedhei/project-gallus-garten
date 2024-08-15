import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './index.css'
import router from './router'

import vAnimate from './directives/v-animate'

import SectionSimple from './components/tailwind/SectionSimple.vue';
import RowSimple from './components/tailwind/RowSimple.vue';
import ColumnSimple from './components/tailwind/ColumnSimple.vue';
import TypingEffect from './components/atoms/texts/TypingEffect.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('animate', vAnimate)

app.component('SectionSimple', SectionSimple);
app.component('RowSimple', RowSimple);
app.component('ColumnSimple', ColumnSimple);
app.component('TypingEffect', TypingEffect);

app.mount('#app')
