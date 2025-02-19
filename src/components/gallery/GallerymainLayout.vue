<template>
  <div class="flex flex-col items-center bg-green-100">
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
        <div
          v-for="n in 9"
          :key="n"
          class="relative group w-full h-[25vh] max-sm:h-[15vh] sm:h-[22vh] md:h-[26vh] overflow-hidden bg-gray-300 animate-pulse"
        >
          <!-- Skeleton Placeholder -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
          ></div>
        </div>
      </div>

      <!-- Image Grid -->
      <div v-else class="grid grid-cols-2 max-sm:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-1">
        <div
          v-for="(image, index) in images"
          :key="image.publicId"
          class="relative group w-full h-[25vh] max-sm:h-[15vh] sm:h-[22vh] md:h-[26vh] overflow-hidden bg-gray-300"
          @click="openImage(index)"
        >
          <!-- Actual image -->
          <img
            :src="image.url"
            :alt="image.description"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 hover-active"
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
      <div v-if="loading" class="container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <!-- Sentinel Element -->
      <div ref="sentinel" class="h-1"></div>

      <!-- No More Images -->
      <div v-if="allDataLoaded && !error" class="text-center py-4 text-gray-500">
        No more images to load
      </div>
    </main>
    <div>
      <a
        href="https://arthurvarteressians.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="cursor-pointer enabled:hover:border-gray-400"
      >
        <img
          src="../../../public/images/logo.png"
          alt="Developer Logo"
          class="inline-block w-[100px] h-10 m-3"
        />
      </a>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import GalleryFilter from './GalleryFilters.vue'
import LikeIcon from './LikeIcon.vue'
import ImageModal from './ImageModal.vue'
import MobileImageModal from './MobileImageModal.vue'
import api from '../../services/api'
import type Image from '../../types/ImageModel'

// **Reactive Variables**
const images = ref<Image[]>([])
const loading = ref(false)
const page = ref(1)
const allDataLoaded = ref(false)
const galleryContainer = ref<HTMLElement | null>(null)
const error = ref(false)
const selectedCategory = ref<string | null>(null)

// Modal logic
const selectedImage = ref<number | null>(null)
const isMobile = ref(window.innerWidth <= 640)

const isOffline = ref(false)
const retryCount = ref(0)
const MAX_RETRIES = 1

const sentinel = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

// **Fetch Images Based on Category and Pagination**
const fetchImages = async (reset = false) => {
  if (loading.value || allDataLoaded.value || retryCount.value >= MAX_RETRIES) return
  loading.value = true
  error.value = false

  // Save the current scroll position
  const container = galleryContainer.value
  const currentScroll = container?.scrollTop || 0

  try {
    if (reset) {
      images.value = []
      page.value = 1
    }

    const response = await api.get('/images', {
      params: { page: page.value, category: selectedCategory.value }, // Ensure `category` is passed
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

    // Restore the scroll position after images are loaded
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = currentScroll
      })
    }
  }
}

// **Initialize Intersection Observer for Infinite Scroll**
const setupObserver = async () => {
  await nextTick() // Ensure DOM is updated before selecting the sentinel

  if (observer.value) {
    observer.value.disconnect() // Remove previous observer if exists
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading.value && !allDataLoaded.value) {
        console.log('Sentinel is visible. Fetching more images...')
        fetchImages()
      }
    },
    { threshold: 0.1, rootMargin: '100px 0px' }, // Trigger when 10% of the sentinel is visible
  )

  if (sentinel.value) {
    console.log('Observing sentinel element:', sentinel.value)
    observer.value.observe(sentinel.value)
  } else {
    console.error('Sentinel element not found!')
  }
}

// **Handle Category Change**
const updateFilter = (category: string | null) => {
  if (selectedCategory.value === category) return

  selectedCategory.value = category
  allDataLoaded.value = false
  fetchImages(true) // Reset images when switching category
  setupObserver() // Reinitialize observer
}

// **On Component Mount**
onMounted(async () => {
  await fetchImages()
  setupObserver()
  window.addEventListener('resize', updateIsMobile)
  window.addEventListener('online', updateConnectionStatus)
  window.addEventListener('offline', updateConnectionStatus)
})

// **On Component Unmount**
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
  window.removeEventListener('resize', updateIsMobile)
  window.removeEventListener('online', updateConnectionStatus)
  window.removeEventListener('offline', updateConnectionStatus)
})

// **Monitor Online/Offline Status**
const updateConnectionStatus = () => {
  isOffline.value = !navigator.onLine

  if (isOffline.value) {
    console.warn('You are offline.')
  } else {
    console.log('Back online. Retrying...')
    retryCount.value = 0 // Reset retry count when back online
    fetchImages()
  }
}

// **Detect Screen Size Changes**
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 640
}

// **Open Image Modal**
const openImage = (index: number) => {
  selectedImage.value = index
}

// **Close Image Modal**
const closeImage = () => {
  selectedImage.value = null
}

const handleImageError = (index: number) => {
  console.log(`Image ${index} failed to load`)
}

// **Load More Images (Manual Trigger)**
const loadMoreImages = async () => {
  if (!allDataLoaded.value && !loading.value) {
    await fetchImages()
  }
}

// **Next Image**
const goToNext = async () => {
  if (selectedImage.value !== null && selectedImage.value < images.value.length - 1) {
    selectedImage.value++ // Move to the next image
  } else if (!allDataLoaded.value) {
    await fetchImages() // Fetch more images if at the end
    if (selectedImage.value !== null && selectedImage.value < images.value.length - 1) {
      selectedImage.value++ // Move to the next image after fetching
    }
  }
}

// **Previous Image**
const goToPrevious = () => {
  if (selectedImage.value !== null && selectedImage.value > 0) {
    selectedImage.value-- // Move to the previous image
  }
}
</script>

<style scoped>
/* Shimmer Animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite linear;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.container {
  --uib-size: 40px;
  --uib-color: black;
  --uib-speed: 0.9s;
  --uib-center: calc(var(--uib-size) / 2 - var(--uib-size) / 5 / 2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: rotate calc(var(--uib-speed) * 3) linear infinite;
  margin: 20px auto;
}

.dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

.dot::before {
  content: '';
  height: 20%;
  width: 20%;
  border-radius: 50%;
  background-color: var(--uib-color);
  animation: oscillate var(--uib-speed) ease-in-out infinite alternate;
  transition: background-color 0.3s ease;
}

.dot:nth-child(1)::before {
  transform: translateX(var(--uib-center));
}

.dot:nth-child(2) {
  transform: rotate(45deg);
}

.dot:nth-child(2)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.125);
}

.dot:nth-child(3) {
  transform: rotate(90deg);
}

.dot:nth-child(3)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.25);
}

.dot:nth-child(4) {
  transform: rotate(135deg);
}

.dot:nth-child(4)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.375);
}

.dot:nth-child(5) {
  transform: rotate(180deg);
}

.dot:nth-child(5)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.5);
}

.dot:nth-child(6) {
  transform: rotate(225deg);
}

.dot:nth-child(6)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.625);
}

.dot:nth-child(7) {
  transform: rotate(270deg);
}

.dot:nth-child(7)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.75);
}

.dot:nth-child(8) {
  transform: rotate(315deg);
}

.dot:nth-child(8)::before {
  transform: translateX(var(--uib-center));
  animation-delay: calc(var(--uib-speed) * -0.875);
}

@keyframes oscillate {
  0% {
    transform: translateX(var(--uib-center)) scale(0);
    opacity: 0.25;
  }

  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
