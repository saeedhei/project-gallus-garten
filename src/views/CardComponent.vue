<template>
  <div class="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 max-w-md relative">
    <!-- Circular Image -->
    <img :src="img" :alt="alt" class="rounded-full w-36 h-36 mb-8" />

    <!-- Name -->
    <h2 class="text-xl font-bold text-gray-800 mb-3">{{ name }}</h2>

    <!-- Title -->
    <h4 class="text-base text-[#65A30D] mb-6">{{ title }}</h4>

    <!-- Button -->
    <button
      class="bg-[#65A30D] text-white text-base font-medium py-3 px-8 rounded-lg hover:bg-gray-700 transition duration-300 mb-8"
    >
      Profil ansehen
    </button>

    <!-- Black Box for Start Date -->
    <div
      class="w-full bg-[#778899] text-white  text-center py-4 rounded-b-lg absolute bottom-0 left-0"
    >
      Started on: {{ startDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  img: { type: String, required: true },
  alt: { type: String, default: 'Personal image' },
  name: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
})
</script>
