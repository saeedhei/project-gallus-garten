import './style.css';
import 'leaflet/dist/leaflet.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client';
import VueKonva from 'vue-konva';

import App from './App.vue';
import router from './router';

import vAnimate from './directives/v-animate';

import TypingEffect from './components/atoms/texts/TypingEffect.vue';

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);
app.use(head);
app.use(VueKonva);

app.directive('animate', vAnimate);

app.component('TypingEffect', TypingEffect);

app.mount('#app');
