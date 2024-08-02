<!-- <template>
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h2>Website Under Construction</h2>
        <p>Our website is currently under construction. Please check back later.</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPopup: true,
      };
    },
    methods: {
      closePopup() {
        this.showPopup = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  </style> -->

<template>
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup-content">
      <h2
        v-animate:flash="1.5"
        class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
      >
        Website im Aufbau
      </h2>
      <div class="grid place-items-center">
        <img
          border="0"
          height="132"
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNyBvKo6rod1usAgp7liRoKVyKEfJLvuXOXMRmUB0k_WMdzvPZIEsMwEeACouz0SUcNMy9pTynN8IT4GuDd8SbdsWukQ251aLDJUzUQ336YJ0Db_Xx8eQtOI_sc7yHgYqhYDDkJN1DgDTm/s1600/Website-Under-Construction-template1.jpg"
          width="200"
        />
      </div>
      <p class="pt-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Unsere Website befindet sich derzeit im Aufbau.
      </p>
      <br />
      <button
        class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        @click="closePopup"
      >
        Weiter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive reference to control the visibility of the popup
const showPopup = ref(true)

// Function to close the popup
const closePopup = () => {
  showPopup.value = false
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300;
}
</style>
