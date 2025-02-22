<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center"
  >
    <!-- Modal Container -->
    <div
      class="w-full max-w-md h-[80vh] mt-10 bg-gray-900 rounded-lg shadow-lg overflow-y-auto"
      ref="modalContainer"
    >
      <!-- Image List (Selected Image Appears First) -->
      <div
        v-for="(image, index) in sortedImages"
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
        </div>
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
import { defineProps, defineEmits, ref, watch, nextTick, computed } from 'vue'
import type Image from '../../types/ImageModel'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  images: {
    type: Array as () => Image[],
    required: true
  },
  selectedImage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'loadMore'])

const modalContainer = ref<HTMLElement | null>(null)
const imageRefs = ref<HTMLElement[]>([])

const sortedImages = computed(() => {
  if (!props.images.length || props.selectedImage === null) return props.images
  const selectedImg = props.images[props.selectedImage]
  const otherImages = props.images.filter((_, i) => i !== props.selectedImage)
  return [selectedImg, ...otherImages] // Move selected image to the top
})

const setImageRef = (el: HTMLElement, index: number) => {
  if (el) {
    imageRefs.value[index] = el
  }
}

const scrollToImage = () => {
  if (!imageRefs.value.length) return
  const target = imageRefs.value[0] // Always first item (selected image)
  if (target) {
    target.scrollIntoView({ behavior: 'instant', block: 'start' })
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      imageRefs.value = []
      nextTick(scrollToImage) // Ensure the selected image appears first
    }
  },
  { immediate: true }
)

const closeModal = () => {
  emit('close')
}
</script>
