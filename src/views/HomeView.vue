<script setup lang="ts">
import HeaderView from '../components/1-home/HeaderView.vue'
// import MainView from '../components/1-home/MainView.vue'
import FooterView from '../components/1-home/FooterView.vue'
import { ref } from 'vue'

const label = ref('Click me')
const handleClick = () => {
  alert('Button clicked!')
}
</script>

<template>
  <HeaderView />
  <main>
    <!-- <MainView /> -->
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> -->
    <!-- Your three columns go here -->
    <!-- <div class="bg-gray-200 p-4">Column 1</div> -->
    <!-- <div class="bg-gray-200 p-4">Column 2</div> -->
    <!-- <div class="bg-gray-200 p-4">Column 3</div> -->
    <!-- </div> -->

    <!-- <button class="btn" @click="handleClick">
    {{ label }}
  </button> -->
  </main>
  <FooterView />
</template>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300;
}
</style>
