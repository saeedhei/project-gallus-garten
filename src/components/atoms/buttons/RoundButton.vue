<script setup lang="ts">
import { ref } from 'vue'

const label = ref('Click me')
const handleClick = () => {
  alert('Button clicked!')
}
</script>

<template>
  <button class="btn" @click="handleClick">
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300;
}
</style>
