<script setup lang="ts">
import TopHeaderView from '../../organisms/header-teils/TopHeader.vue'
</script>

<template>
  <header class="bg-white shadow-md" style="background-color: #509e49">
    <TopHeaderView />
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl text-center">Über uns</h1>
      <p class="mt-4 text-lg text-white max-w-3xl mx-auto text-center">
        Ein Garten für Alle – Urban Gardening im Gallus – Bürgergarten.
      </p>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
header {
  font-family: 'Poppins', sans-serif;
}
</style>
