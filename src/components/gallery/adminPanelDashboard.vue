<template>
  <div class="p-8">
    <!-- Session Expired Modal -->
    <div
      v-if="isSessionExpired"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-green-200 p-8 rounded-lg shadow-lg text-center">
        <h2 class="text-2xl text-gray-700 font-bold mb-4">Session Expired</h2>
        <p class="mb-6 text-gray-700">Your session has expired. Please log in again!</p>
        <button
          @click="redirectToLogin"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>
    </div>

    <!-- Overlay to block interactions -->
    <div v-if="isSessionExpired" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    <!-- Admin Dashboard Content -->
    <div :class="{ 'opacity-50 pointer-events-none': isSessionExpired }">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-center">Admin Dashboard</h2>
        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <!-- Notification Popup -->
      <div
        v-if="notificationMessage"
        class="fixed top-4 right-4 px-4 py-2 rounded shadow text-white"
        :class="notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ notificationMessage }}
      </div>

      <!-- Search Section -->
      <div class="mb-6 flex justify-center items-center gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Public ID..."
          class="p-2 border text-gray-700 rounded w-1/2"
        />
        <button
          @click="handleSearch"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          @click="resetSearch"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <!-- Image List -->
      <div v-if="images.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(image, index) in images"
          :key="image.publicId"
          class="p-4 border rounded-lg shadow-lg bg-white relative"
        >
          <div class="relative">
            <img
              :src="image.url"
              :alt="image.publicId"
              class="w-full h-40 object-cover rounded mb-4"
              :class="{ 'opacity-40 grayscale-50': !image.isPublic }"
            />
            <button
              class="absolute top-2 right-2 bg-green-300 rounded-full p-2 shadow"
              @click="toggleVisibility(image, index)"
            >
              <img :src="image.isPublic ? eyeVisiblen : eyeHidden" class="w-6 h-6" />
            </button>
          </div>

          <p class="font-semibold text-gray-700 mb-2">Public ID: {{ image.publicId }}</p>
          <div class="mt-4">
            <p class="text-gray-700">
              <strong>Categories:</strong>
              {{ Array.isArray(image.category) ? image.category.join(', ') : image.category }}
            </p>
            <p class="text-gray-700"><strong>Year:</strong> {{ image.year }}</p>
          </div>
          <!-- Edit Description -->
          <div v-if="editingIndex === index">
            <textarea
              v-model="editedDescription"
              class="w-full p-2 border text-gray-700 rounded mb-2"
              rows="3"
            >
            </textarea>
            <div class="flex text-gray-700 gap-2">
              <button
                @click="saveDescription(image.publicId, index)"
                class="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                @click="cancelEditingDescription"
                class="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
          <div v-else>
            <p class="mb-4 text-gray-700"><strong> Description:</strong> {{ image.description }}</p>
            <div class="flex w-full justify-between">
              <button
                @click="startEditingDescription(index, image.description)"
                class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Edit Description
              </button>
              <button
                @click="startEditingCategories(index)"
                class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Edit Categories
              </button>
              <button
                @click="startEditingYear(index)"
                class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Edit Year
              </button>
            </div>
          </div>

          <!-- Edit Categories -->
          <div v-if="editingCategoriesIndex === index" class="mt-4">
            <input
              v-model="categorySearchQuery"
              type="text"
              placeholder="Search categories..."
              class="p-2 border text-gray-700 rounded w-full mb-2"
            />
            <div class="max-h-40 overflow-y-auto">
              <div
                v-for="category in filteredCategories"
                :key="category"
                class="flex items-center mb-2"
              >
                <input
                  type="checkbox"
                  :id="`category-${category}`"
                  :value="category"
                  v-model="selectedCategories"
                  class="mr-2"
                />
                <label :for="`category-${category}`" class="text-gray-700">{{ category }}</label>
              </div>
            </div>
            <div class="flex gap-2 mt-2">
              <button
                @click="saveCategories(image.publicId, index)"
                class="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                @click="cancelEditingCategories"
                class="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Edit Year -->
          <div v-if="editingYearIndex === index" class="mt-4">
            <select v-model="selectedYear" class="w-full p-2 border text-gray-700 rounded">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <div class="flex gap-2 mt-2">
              <button
                @click="saveYear(image.publicId, index)"
                class="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
              >
                Save
              </button>

              <button
                @click="cancelEditingYears"
                class="bg-red-500 px-4 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Display Categories and Year -->
        </div>
      </div>
      <p v-else class="text-center text-gray-700">No images found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import type Image from '../../types/ImageModel'

import { useSeo } from '@/composables/useSeo'
import jwtDecode from 'jwt-decode'
const baseUrl = import.meta.env.VITE_APP_BASE_URL

if (!baseUrl) {
  throw new Error(
    "The required environment variable 'VITE_APP_BASE_URL' is missing. Please check your .env file.",
  )
}

useSeo({
  title: 'Ein Garten für alle • GallusGarten',
  description: 'Learn more about our company, values, and mission.',
  ogTitle: 'Ein Garten für alle • GallusGarten',
  ogDescription: 'Discover what makes our company unique.',
  ogImage: `${baseUrl}src/assets/images/GallusGarten.svg`,
  ogUrl: window.location.href,
  robots: 'noindex, nofollow',
})

const eyeHidden = '../../../images/eyeHidden.svg'
const eyeVisiblen = '../../../images/eyeVisible.svg'

// State variables
const searchQuery = ref('')
const editingIndex = ref<number | null>(null)
const editingCategoriesIndex = ref<number | null>(null)
const editingYearIndex = ref<number | null>(null)
const editedDescription = ref<string>('')
const selectedYear = ref<number | null>(null)
const categorySearchQuery = ref('')
const categories = ref<string[]>([])
const years = ref<number[]>([])
const selectedCategories = ref<string[]>([])
const images = ref<Image[]>([])

// Notification state
const notificationMessage = ref<string | null>(null)
const notificationType = ref<'success' | 'error'>('success')

// Router instance for navigation
const router = useRouter()

const redirectToLogin = () => {
  router.push('/admin-panel-login')
}

const isSessionExpired = ref(false)
const checkTokenExpiration = () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    isSessionExpired.value = true
    return
  }

  try {
    const decoded = jwtDecode(token) as { exp: number }
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      isSessionExpired.value = true
      localStorage.removeItem('authToken') // Remove expired token
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    isSessionExpired.value = true
  }
}

let expirationCheckInterval: number

onMounted(() => {
  fetchImages()
  fetchCategories()
  generateYears()

  // Check token expiration every 5 seconds
  expirationCheckInterval = setInterval(checkTokenExpiration, 5000)
})

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  clearInterval(expirationCheckInterval)
})

// Fetch all images
const fetchImages = async () => {
  try {
    const response = await api.get('/adminPanelDash')
    images.value = response.data.images
  } catch (error) {
    console.error('Error fetching images:', error)
    notificationMessage.value = 'Error fetching images!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Fetch all categories
const fetchCategories = async () => {
  try {
    const response = await api.get('/categories')
    categories.value = response.data.categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    notificationMessage.value = 'Error fetching categories!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Generate years from 2019 to current year
const generateYears = () => {
  const currentYear = new Date().getFullYear()
  for (let year = 2019; year <= currentYear; year++) {
    years.value.push(year)
  }
}

// Search by publicId
const handleSearch = async () => {
  try {
    const response = await api.get('/adminPanelDash', {
      params: { search: searchQuery.value },
    })
    images.value = response.data.images

    if (!images.value.length) {
      notificationMessage.value = 'No results found!'
      notificationType.value = 'error'
      setTimeout(() => (notificationMessage.value = null), 3000)
    }
  } catch (error) {
    console.error('Error searching image:', error)
    notificationMessage.value = 'Image not found!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Reset search and fetch all images
const resetSearch = async () => {
  try {
    searchQuery.value = ''
    await fetchImages()
  } catch (error) {
    console.error('Error resetting images:', error)
    notificationMessage.value = 'Failed to reset search!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Edit description
const startEditingDescription = (index: number, currentDescription: string) => {
  editingIndex.value = index
  editedDescription.value = currentDescription
}

// Edit categories
const startEditingCategories = (index: number) => {
  editingCategoriesIndex.value = index
  selectedCategories.value = [...images.value[index].category] // Copy categories to avoid direct mutation
}

// Edit year
const startEditingYear = (index: number) => {
  editingYearIndex.value = index
  selectedYear.value = images.value[index].year
}

// Save description
const saveDescription = async (publicId: string, index: number) => {
  try {
    await api.put(
      `/adminPanelDash/update-description/${publicId}`,
      { description: editedDescription.value },
      { headers: { 'Content-Type': 'application/json' } },
    )

    images.value[index].description = editedDescription.value
    editingIndex.value = null

    // Show success notification
    notificationMessage.value = 'Description updated successfully!'
    notificationType.value = 'success'
    setTimeout(() => (notificationMessage.value = null), 3000)
  } catch (error) {
    console.error('Error updating description:', error)

    // Show error notification
    notificationMessage.value = 'Failed to update description!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Save categories
const saveCategories = async (publicId: string, index: number) => {
  try {
    await api.put(
      `/update-categories/${publicId}`,
      { categories: selectedCategories.value },
      { headers: { 'Content-Type': 'application/json' } },
    )

    images.value[index].category = selectedCategories.value
    editingCategoriesIndex.value = null

    // Show success notification
    notificationMessage.value = 'Categories updated successfully!'
    notificationType.value = 'success'
    setTimeout(() => (notificationMessage.value = null), 3000)
  } catch (error) {
    console.error('Error updating categories:', error)

    // Show error notification
    notificationMessage.value = 'Failed to update categories!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Save year
const saveYear = async (publicId: string, index: number) => {
  try {
    await api.put(
      `/update-year/${publicId}`,
      { year: selectedYear.value },
      { headers: { 'Content-Type': 'application/json' } },
    )

    // Ensure selectedYear.value is a number
    if (selectedYear.value !== null) {
      images.value[index].year = selectedYear.value
    } else {
      console.error('Selected year is null')
      return
    }

    editingYearIndex.value = null

    // Show success notification
    notificationMessage.value = 'Year updated successfully!'
    notificationType.value = 'success'
    setTimeout(() => (notificationMessage.value = null), 3000)
  } catch (error) {
    console.error('Error updating year:', error)

    // Show error notification
    notificationMessage.value = 'Failed to update year!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Toggle visibility
const toggleVisibility = async (image: Image, index: number) => {
  try {
    const newStatus = !image.isPublic
    await api.put(`/adminPanelDash/imageStatus/${image.publicId}`, { isVisible: newStatus })
    images.value[index].isPublic = newStatus
  } catch (error) {
    console.error('Error updating visibility:', error)
    notificationMessage.value = 'Failed to update visibility!'
    notificationType.value = 'error'
    setTimeout(() => (notificationMessage.value = null), 3000)
  }
}

// Logout function
const logout = () => {
  router.push('/admin-panel-login')
  localStorage.removeItem('authToken')
}

// Cancel editing description
const cancelEditingDescription = () => {
  editingIndex.value = null
  editedDescription.value = ''
}

// Cancel editing categories
const cancelEditingCategories = () => {
  editingCategoriesIndex.value = null
  selectedCategories.value = []
}

const cancelEditingYears = () => {
  editingYearIndex.value = null
  selectedYear.value = null
}

// Filtered categories based on search query
const filteredCategories = computed(() => {
  return categories.value.filter((category) =>
    category.toLowerCase().includes(categorySearchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  fetchImages()
  fetchCategories()
  generateYears()
})
</script>
