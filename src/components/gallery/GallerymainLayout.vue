<template>
  <div class="h-screen flex flex-col items-center bg-green-200">
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
          <img
            src="../../../public/images/logo.png"
            alt="Developer Logo"
            class="inline-block w-[80px] h-8 ml-2"
          />
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

const loadImages = async (tag: string | null = null, reset = false) => {
  if (loading.value || allDataLoaded.value) return
  loading.value = true
  error.value = false
  const container = galleryContainer.value
  const currentScroll = container?.scrollTop || 0
  try {
    if (reset) {
      images.value = []
      page.value = 1
    }
    const response = await api.get('images', {
      params: { page: page.value, tag },
    })
    if (response.data.images && response.data.images.length > 0) {
      images.value.push(...response.data.images)
      page.value++
      allDataLoaded.value = !response.data.hasMore
    } else {
      allDataLoaded.value = true
    }
  } catch (err) {
    console.error('Error loading images:', err)
    error.value = true
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
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const loadMoreImages = async () => {
  if (!allDataLoaded.value && !loading.value) {
    await loadImages(selectedTag.value)
  }
}
</script>

<style scoped>
.hidden-hover {
  display: none !important;
}
.hover-active {
  transform: none !important;
}
</style>
