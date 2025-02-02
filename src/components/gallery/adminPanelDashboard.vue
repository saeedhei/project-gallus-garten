<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-center">Admin Dashboard</h2>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </div>

    <!-- Notification Popup -->
    <div v-if="notificationMessage" class="fixed top-4 right-4 px-4 py-2 rounded shadow text-white"
      :class="notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'">
      {{ notificationMessage }}
    </div>

    <!-- Search Section -->
    <div class="mb-6 flex justify-center items-center gap-4">
      <input v-model="searchQuery" type="text" placeholder="Search by Public ID..."
        class="p-2 border text-gray-700 rounded w-1/2" />
      <button @click="handleSearch" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
      <button @click="resetSearch" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Reset
      </button>
    </div>

    <!-- Image List -->
    <div v-if="images.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(image, index) in images" :key="image.publicId"
        class="p-4 border rounded-lg shadow-lg bg-white relative">
        <div class="relative">
          <img :src="image.url" :alt="image.publicId" class="w-full h-40 object-cover rounded mb-4"
            :class="{ 'opacity-40 grayscale-50': !image.isPublic }" />
          <button class="absolute top-2 right-2 bg-green-300 rounded-full p-2 shadow"
            @click="toggleVisibility(image, index)">
            <img :src="image.isPublic ? eyeVisiblen : eyeHidden" class="w-6 h-6" />
          </button>
        </div>

        <p class="font-semibold text-gray-700 mb-2">Public ID: {{ image.publicId }}</p>

        <div v-if="editingIndex === index">
          <textarea v-model="editedDescription" class="w-full p-2 border text-gray-700 rounded mb-2"
            rows="3"></textarea>
          <div class="flex text-gray-700 gap-2">
            <button @click="saveDescription(image.publicId, index)"
              class="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600">
              Save
            </button>
          </div>
        </div>
        <div v-else>
          <p class="mb-4 text-gray-700">{{ image.description }}</p>
          <div class="flex w-full justify-between">
            <button @click="startEditing(index, image.description)"
              class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
              Edit Description
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-gray-700">No images found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import type Image from '../../types/ImageModel'

const eyeHidden = '../../../images/eyeHidden.svg';
const eyeVisiblen = '../../../images/eyeVisible.svg';

// State variables
const images = ref<Image[]>([])
const searchQuery = ref('')
const editingIndex = ref<number | null>(null)
const editedDescription = ref<string>('')

// Notification state
const notificationMessage = ref<string | null>(null)
const notificationType = ref<'success' | 'error'>('success')

// Router instance for navigation
const router = useRouter()

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
  searchQuery.value = ''
  await fetchImages()
}

// Edit description
const startEditing = (index: number, currentDescription: string) => {
  editingIndex.value = index
  editedDescription.value = currentDescription
}

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
}

onMounted(() => {
  fetchImages()
})
</script>
