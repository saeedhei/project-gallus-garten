<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center"
  >
    <!-- Modal Container -->
    <div
      class="w-full max-w-md h-[80vh] mt-10 bg-gray-900 rounded-lg shadow-lg overflow-y-auto"
      ref="modalContainer"
      @scroll="handleScroll"
    >
      <!-- Image List -->
      <div
        v-for="(image, index) in images"
        :key="image.publicId"
        class="mb-6 p-4"
        :ref="(el) => setImageRef(el as HTMLElement, index)"
      >
        <!-- Image Content -->
        <img
          :src="image.url"
          :alt="image.description"
          class="w-full h-auto rounded-lg object-contain"
        />
        <div class="mt-2 text-white text-center">
          <p class="text-lg font-semibold">{{ image.description }}</p>
          <div class="flex justify-center items-center mt-1 space-x-2">
            <img src="/images/leaf.svg" alt="Leaf Icon" class="w-5 h-5" />
            <p>{{ image.likes }} Likes</p>
          </div>
          <div>
            <p>Public ID: {{ image.publicId }}</p>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="text-white text-center py-4">
        Loading more images...
      </div>
    </div>

    <!-- Close Button -->
    <button
      class="absolute top-4 right-4 mt-[80px] bg-gray-700 hover:bg-gray-600 text-white p-2 rounded shadow-md"
      @click="closeModal"
    >
      ✕
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, nextTick } from 'vue'
import type Image from '../../types/ImageModel'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array as () => Image[],
    required: true,
  },
  selectedImage: {
    type: Number,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'loadMore'])

const modalContainer = ref<HTMLElement | null>(null)
const imageRefs = ref<HTMLElement[]>([])

const setImageRef = (el: HTMLElement, index: number) => {
  if (el) {
    imageRefs.value[index] = el
  }
}

const scrollToImage = () => {
  if (!imageRefs.value.length || props.selectedImage === null) return

  const target = imageRefs.value[props.selectedImage]
  if (target) {
    target.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    })
  }
}

const handleScroll = () => {
  if (!modalContainer.value || props.isLoading) return

  const { scrollTop, scrollHeight, clientHeight } = modalContainer.value
  const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100

  if (isNearBottom) {
    emit('loadMore') // Emit event to fetch more images
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      imageRefs.value = [] // Reset refs
      nextTick(() => {
        scrollToImage() // Scroll to the selected image after DOM update
      })
    }
  },
  { immediate: true },
)

// Close modal
const closeModal = () => {
  emit('close')
}
</script>
