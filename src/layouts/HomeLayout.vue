<script setup lang="ts">
import Header from './header/HeaderView.vue'
import Footer from './footer/FooterView.vue'
</script>

<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
