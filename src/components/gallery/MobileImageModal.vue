<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center"
  >
    <!-- Modal Container -->
    <div
      class="w-full max-w-md h-[80vh] bg-gray-900 rounded-lg shadow-lg overflow-y-auto"
      ref="modalContainer"
      @scroll="handleScroll"
    >
      <!-- Display Images -->
      <div v-for="image in images" :key="image.publicId" class="mb-6 p-4">
        <!-- Image -->
        <img
          :src="image.url"
          :alt="image.description"
          class="w-full h-auto rounded-lg object-contain"
        />

        <!-- Image Details -->
        <div class="mt-2 text-white text-center">
          <p class="text-lg font-semibold">{{ image.description }}</p>
          <div class="flex justify-center items-center mt-1 space-x-2">
            <img src="../../../public/images/leaf.svg" alt="Leaf Icon" class="w-5 h-5" />

            <p>{{ image.likes }} Likes</p>
          </div>
          <div>
            <p>Public ID: {{ image.publicId }}</p>
          </div>
          <hr class="border-0.5 border-gray-500 my-6 mx-auto w-3/4" />
        </div>
      </div>
    </div>

    <!-- Close Button -->
    <button
      class="absolute top-4 right-4 mt-[50px] bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-md"
      @click="closeModal"
    >
      ✕
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import type { Image } from '@/models/ImageModel';


defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array as () => Image[],
    required: true,
  },
})

// Emits
const emit = defineEmits(['close', 'loadMore'])

// Refs
const modalContainer = ref<HTMLElement | null>(null)

// Close Modal
const closeModal = () => {
  emit('close')
}

// Handle Scroll for Lazy Loading
const handleScroll = () => {
  const container = modalContainer.value
  if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
    emit('loadMore') // Emit event to load more images
  }
}
</script>

<style scoped>
/* Ensure scrolling works smoothly */
.modal-container {
  overflow-y: auto;
  max-height: 60vh;
}
</style>
