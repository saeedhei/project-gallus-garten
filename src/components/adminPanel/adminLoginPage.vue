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
        <button type="submit" class="w-full text-black bg-blue-500 p-2 hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const correctUsername = import.meta.env.VITE_GALLUS_ADMIN_USER
const correctPassword = import.meta.env.VITE_GALLUS_ADMIN_PASSWORD
const errorMessage = ref('')

const handleLogin = () => {
  if (username.value === correctUsername && password.value === correctPassword) {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>


