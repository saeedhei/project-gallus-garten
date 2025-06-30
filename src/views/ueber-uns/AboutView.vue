<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'

// **Define Data Types**
interface Image {
  id: string
  url: string
}

interface CategoryResponse {
  categories: string[]
}

interface ImageResponse {
  images: Image[]
}

// **Reactive Variables**
const categories = ref<string[]>([])
const selectedCategory = ref<string | null>(null)
const images = ref<Image[]>([])
const page = ref<number>(1)
const isLoading = ref<boolean>(false)
const observer = ref<IntersectionObserver | null>(null)

// **Fetch Categories from API**
const fetchCategories = async () => {
  try {
    const response = await axios.get<CategoryResponse>('http://localhost:5002/api/c')
    categories.value = response.data.categories

    // Set default selected category
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0]
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// **Fetch Images Based on Category and Pagination**
const fetchImages = async (reset = false) => {
  if (isLoading.value || !selectedCategory.value) return
  isLoading.value = true

  try {
    const response = await axios.get<ImageResponse>('http://localhost:5002/api/i', {
      params: { category: selectedCategory.value, page: page.value, limit: 15 },
    })

    if (reset) {
      images.value = response.data.images // Reset images when switching category
    } else {
      images.value.push(...response.data.images) // Append new images when scrolling
    }

    page.value++ // Increment page number
  } catch (error) {
    console.error('Error fetching images:', error)
  } finally {
    isLoading.value = false
  }
}

// **Initialize Intersection Observer for Infinite Scroll**
const setupObserver = async () => {
  await nextTick() // Ensure DOM is updated before selecting #load-more

  if (observer.value) {
    observer.value.disconnect() // Remove previous observer if exists
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchImages()
      }
    },
    { threshold: 0.5 },
  )

  const loadMoreElement = document.getElementById('load-more')
  if (loadMoreElement) {
    observer.value.observe(loadMoreElement)
  }
}

// **Handle Category Change**
watch(selectedCategory, async () => {
  page.value = 1
  await fetchImages(true) // Reset images when switching category
  setupObserver() // Reinitialize observer
})

// **On Component Mount**
onMounted(async () => {
  await fetchCategories()
  await fetchImages()
  setupObserver()
})
</script>

<template>
  <div class="p-4">
    <!-- **Category Selection Bar** -->
    <div class="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        class="px-4 py-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all"
        :class="
          selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        "
      >
        {{ category }}
      </button>
    </div>

    <!-- **Image Gallery Grid (Instagram-style)** -->
    <div class="grid grid-cols-3 gap-2 mt-4">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.url"
        alt="Gallery Image"
        class="w-full h-48 object-cover rounded-md"
        loading="lazy"
      />
    </div>

    <!-- **Infinite Scroll Trigger** -->
    <div id="load-more" class="h-10"></div>
  </div>
</template>

<style>
/* **Hide Scrollbar for a Clean Look** */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

<!-- <template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
