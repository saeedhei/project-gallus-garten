<template>
  <div class="legal p-6 bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">Docs:</h1>
    <nav class="mb-6">
      <router-link to="/docs/changelog" class="text-blue-500 hover:underline mr-4"
        >Changelog</router-link
      >
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.legal {
  margin: 20px;
}
</style>
