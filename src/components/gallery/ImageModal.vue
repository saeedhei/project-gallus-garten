<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
  >
    <!-- Main Modal Container -->
    <div class="relative w-[90vw] max-w-[1100px] h-[80vh] mt-[5vh] bg-gray-900 rounded-lg shadow-lg flex">
      <!-- Image Section -->
      <div class="w-[70%] flex items-center justify-center bg-black">
        <img
          :src="image.url"
          :alt="image.description"
          class="max-w-full max-h-full object-contain"
        />
      </div>

      <!-- Details Section -->
      <div class="w-[30%] p-8 text-white">
        <button
          class="absolute top-8 right-4 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded shadow-md"
          @click="closeModal"
        >
          ✕
        </button>

        <!-- Description -->
        <div>
          <p class="text-lg font-semibold">Description</p>
          <p class="mt-2 text-sm">{{ image.description }}</p>
        </div>

        <!-- Details -->
        <div class="mt-6 text-sm">
          <p class="font-semibold">Details</p>
          <div class="flex items-center space-x-2 mt-2">
            <!-- Leaf Icon -->
            <img src="../../../public/images/leaf.svg" alt="Leaf Icon" class="w-5 h-5" />
            <span>{{ image.likes }} Likes</span>
          </div>
          <p class="mt-2">Public ID: {{ image.publicId }}</p>
        </div>
      </div>
    </div>

    <!-- Previous Button -->
    <button
      v-if="hasPrevious"
      class="absolute left-4 top-1/2 bg-green-600 hover:bg-green-700 rounded-full p-2 shadow-lg"
      @click="goToPrevious"
    >
      <img src="../../../public/images/prev-icon.svg" alt="Previous" class="w-6 h-6" />
    </button>

    <!-- Next Button -->
    <button
      v-if="hasNext"
      class="absolute right-4 top-1/2 bg-green-600 hover:bg-green-700 rounded-full p-2 shadow-lg"
      @click="goToNext"
    >
      <img src="../../../public/images/next-icon.svg" alt="Next" class="w-6 h-6" />
    </button>
  </div>
</template>

<script lang="ts" setup>
// Props for the modal
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  hasPrevious: {
    type: Boolean,
    required: true,
  },
  hasNext: {
    type: Boolean,
    required: true,
  },
})

// Emits for modal events
const emit = defineEmits(['close', 'next', 'previous'])

// Functions for navigation
const closeModal = () => {
  emit('close')
}

const goToNext = () => {
  emit('next')
}

const goToPrevious = () => {
  emit('previous')
}
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Leaf Icon Styling */
img.w-5.h-5 {
  width: 20px;
  height: 20px;
}

/* Adjust button hover effect */
button:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
