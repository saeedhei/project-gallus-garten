<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackToTop from './components/atoms/buttons/BackTopButton.vue';
import WelcomeCookie from './components/organisms/WelcomeCookie.vue';
</script>

<template>
  <RouterView />
  <BackToTop />
  <WelcomeCookie />
</template>

<style scoped></style>
