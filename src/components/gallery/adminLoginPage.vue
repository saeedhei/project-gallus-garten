<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-200">
    <div class="bg-white text-gray-600 p-8 shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <div v-if="errorMessage" class="mb-4 text-red-500">{{ errorMessage }}</div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full p-2 border"
            placeholder="Enter your username"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 border"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="w-full text-white bg-blue-500 p-2 hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'

const username = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await api.post('/login', {
      username: username.value,
      password: password.value,
    })

    // console.log('Full response:', response); // Debugging

    if (response.data.success && response.data.token) {
      const token = response.data.token
      // console.log('Token received:', token); // Debugging

      // Save the token to localStorage
      localStorage.setItem('authToken', token)

      // Redirect to the dashboard
      router.push('/dashboard')
    } else {
      throw new Error('Token not found in response')
    }
  } catch (error) {
    console.error('Login error:', error) // Debugging
    const axiosError = error as { response?: { status: number; data: { message: string } } }

    if (axiosError.response?.status === 401) {
      errorMessage.value = 'Invalid username or password'
    } else if (axiosError.response) {
      errorMessage.value =
        axiosError.response.data.message || 'An error occurred. Please try again later.'
    } else {
      errorMessage.value = 'An unexpected error occurred.'
    }
  }
}
</script>
