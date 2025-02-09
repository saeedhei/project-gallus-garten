<template>
  <div class="h-screen flex flex-col items-center bg-gray-100">
    <!-- Notification Bar -->
    <div
      v-if="isOffline"
      class="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 fixed top-4 right-4 z-50 shadow-lg rounded-lg flex items-center space-x-3 animate-slide-right"
    >
      <!-- Warning Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-yellow-200 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.29 3.86L1.82 16.14c-.76 1.2.17 2.86 1.64 2.86h16.69c1.47 0 2.4-1.66 1.64-2.86L13.71 3.86a2 2 0 00-3.42 0z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01" />
      </svg>

      <!-- Message -->
      <span class="text-sm font-semibold">
        You are offline. Please check your internet connection and try again.
      </span>
    </div>

    <!-- Filter Dropdown -->
    <GalleryFilter @filterChanged="updateFilter" />

    <!-- Main Gallery -->
    <main class="w-full max-w-6xl bg-gray-200 h-[80vh] overflow-y-auto p-4" ref="galleryContainer">
      <!-- Skeleton Loader -->
      <div
        v-if="loading"
        class="grid grid-cols-2 max-sm:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-1"
      >
        <SkeletonImage v-for="n in 9" :key="n" />
      </div>

      <!-- Image Grid -->
      <div v-else class="grid grid-cols-2 max-sm:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-1">
        <div
          v-for="(image, index) in images"
          :key="image.publicId"
          class="relative group w-full h-[25vh] max-sm:h-[15vh] sm:h-[22vh] md:h-[26vh] overflow-hidden bg-gray-300"
          @click="openImage(index)"
        >
          <!-- SkeletonImage for failed images -->
          <SkeletonImage v-if="image.error" />

          <!-- Actual image -->
          <img
            v-else
            :src="image.url"
            :alt="image.description"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 hover-active"
            @load="handleImageLoad(index)"
            @error="handleImageError(index)"
          />

          <!-- Overlay -->
          <div
            class="absolute bottom-0 left-0 w-full h-[30%] bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hidden-hover"
          >
            <p class="text-sm font-medium text-center">
              {{ image.description }}
            </p>
          </div>

          <!-- Like Icon -->
          <div
            class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden-hover"
          >
            <LikeIcon :initialLikes="image.likes" :imageId="image.publicId" />
          </div>
        </div>
      </div>

      <!-- No More Images -->
      <div v-if="allDataLoaded && !error" class="text-center py-4 text-gray-500">
        No more images to load
      </div>
    </main>
    <div>
      <p class="text-black mt-4">
        Developed by:
        <a
          href="https://arthurvarteressians.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="cursor-pointer enabled:hover:border-gray-400"
        >
          <img src="/images/logo.png" alt="Developer Logo" class="inline-block w-[80px] h-8 ml-2" />
        </a>
      </p>
    </div>

    <!-- Render Image Modals -->
    <ImageModal
      v-if="!isMobile && selectedImage !== null"
      :isOpen="selectedImage !== null"
      :image="images[selectedImage]"
      :hasPrevious="selectedImage > 0"
      :hasNext="selectedImage < images.length - 1 || !allDataLoaded"
      @close="closeImage"
      @next="goToNext"
      @previous="goToPrevious"
    />

    <MobileImageModal
      v-if="isMobile && selectedImage !== null"
      :isOpen="selectedImage !== null"
      :images="images"
      @close="closeImage"
      @loadMore="loadMoreImages"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GalleryFilter from './GalleryFilters.vue'
import SkeletonImage from './SkeletonImage.vue'
import LikeIcon from './LikeIcon.vue'
import ImageModal from './ImageModal.vue'
import MobileImageModal from './MobileImageModal.vue'
import api from '../../services/api'
import type Image from '../../types/ImageModel'

// Reactive variables
const images = ref<Image[]>([])
const loading = ref(false)
const page = ref(1)
const allDataLoaded = ref(false)
const galleryContainer = ref<HTMLElement | null>(null)
const error = ref(false)
const selectedTag = ref<string | null>(null)

// Modal logic
const selectedImage = ref<number | null>(null)
const isMobile = ref(window.innerWidth <= 640)

const isOffline = ref(false) // Track internet connection status
const retryCount = ref(0) // Track retry attempts
const MAX_RETRIES = 2 // Maximum retries allowed

const openImage = (index: number) => {
  selectedImage.value = index
}

const closeImage = () => {
  selectedImage.value = null
}

// Handle image load and error events
const handleImageLoad = (index: number) => {
  images.value[index].error = false // Successfully loaded
}

const handleImageError = (index: number) => {
  images.value[index].error = true // Mark as error
}

// Load images from the API with retry logic
const loadImages = async (tag: string | null = null, reset = false) => {
  if (loading.value || allDataLoaded.value || retryCount.value >= MAX_RETRIES) return
  loading.value = true
  error.value = false

  const container = galleryContainer.value
  const currentScroll = container?.scrollTop || 0

  try {
    if (reset) {
      images.value = []
      page.value = 1
    }

    const response = await api.get('/images', {
      params: { page: page.value, tag },
    })

    if (response.data.images && response.data.images.length > 0) {
      images.value.push(...response.data.images)
      page.value++
      allDataLoaded.value = !response.data.hasMore
      retryCount.value = 0 // Reset retry count on success
    } else {
      allDataLoaded.value = true
    }
  } catch (err) {
    console.error('Error loading images:', err)
    error.value = true
    retryCount.value++

    // Show a message if retries are exhausted
    if (retryCount.value >= MAX_RETRIES) {
      console.error('Max retries reached. Stopping further requests.')
    }
  } finally {
    loading.value = false
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = currentScroll
      })
    }
  }
}

// Filter images by tag
const updateFilter = (tag: string | null) => {
  if (selectedTag.value === tag) return

  selectedTag.value = tag
  allDataLoaded.value = false
  loadImages(tag, true)
}

const handleScroll = () => {
  const container = galleryContainer.value
  if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
    loadImages(selectedTag.value)
  }
}

// Monitor online/offline status
const updateConnectionStatus = () => {
  isOffline.value = !navigator.onLine

  if (isOffline.value) {
    console.warn('You are offline.')
  } else {
    console.log('Back online. Retrying...')
    retryCount.value = 0 // Reset retry count when back online
    loadImages(selectedTag.value)
  }
}

const goToNext = async () => {
  if (selectedImage.value !== null && selectedImage.value < images.value.length - 1) {
    selectedImage.value++
  } else if (!allDataLoaded.value) {
    await loadImages(selectedTag.value)
    if (selectedImage.value !== null && selectedImage.value < images.value.length - 1) {
      selectedImage.value++
    }
  }
}

const goToPrevious = () => {
  if (selectedImage.value !== null && selectedImage.value > 0) {
    selectedImage.value--
  }
}

// Detect screen size changes
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 640
}

onMounted(() => {
  loadImages()
  galleryContainer.value?.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updateIsMobile)
  window.addEventListener('online', updateConnectionStatus)
  window.addEventListener('offline', updateConnectionStatus)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
  window.removeEventListener('online', updateConnectionStatus)
  window.removeEventListener('offline', updateConnectionStatus)
})

const loadMoreImages = async () => {
  if (!allDataLoaded.value && !loading.value) {
    await loadImages(selectedTag.value)
  }
}
</script>

<style scoped>
.hidden- {
  display: none !important;
}
.hover-active {
  transform: none !important;
}

@keyframes slideRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  span {
    font-size: 10px; /* Tailwind's text-sm equivalent */
  }
}
@media (min-width: 641px) {
  span {
    font-size: 14px; /* Tailwind's text-base equivalent */
  }
}

.animate-slide-down {
  animation: slideDown 0.5s ease-in-out forwards;
}
</style>
