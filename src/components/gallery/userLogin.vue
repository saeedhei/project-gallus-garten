<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-200">
    <div class="bg-white text-gray-600 p-8 shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">User Login</h2>
      <div v-if="errorMessage" class="mb-4 text-red-500">{{ errorMessage }}</div>
      <form @submit.prevent="handleUserLogin">
        <div class="mb-4">
          <label class="block mb-2">Login</label>
          <input
            v-model="login"
            type="text"
            autocomplete='username'
            class="w-full p-2 border"
            placeholder="Enter your login"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            autocomplete='current-password'
            class="w-full p-2 border"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const login = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleUserLogin = async () => {
  try {
    const response = await api.post('v1/user/login', {
      login: login.value,
      password: password.value,
    })

    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token)
      router.push('/user-dashboard')
    } else {
      throw new Error('No token')
    }
  } catch (err: any) {
    if (err.response?.status === 401) {
      errorMessage.value = 'Invalid credentials'
    } else {
      errorMessage.value = 'Something went wrong'
    }
  }
}
</script>