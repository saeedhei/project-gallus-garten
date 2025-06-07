<script setup lang="ts">
import Header from '../components/header/HeaderView.vue'
import Footer from '../components/templates-layouts/footers/FooterView.vue'
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
