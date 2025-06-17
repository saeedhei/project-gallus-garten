<!-- cspell:disable -->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackToTop from './components/atoms/buttons/BackTopButton.vue'
import WelcomeCookie from './components/organisms/WelcomeCookie.vue'
// import { useHead } from '@unhead/vue'

// useHead({
// bodyAttrs: {
//   style: 'background: salmon; color: cyan;',
// },
// })
</script>

<template>
  <RouterView />
  <BackToTop />
  <WelcomeCookie />
</template>

<style scoped></style>
