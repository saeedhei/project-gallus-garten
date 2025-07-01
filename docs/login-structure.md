# src\services\api.ts
# src\views\dashboard\DashboardView.vue 
# src\views\login\LoginView.vue 
**************************************************************************************************
# src\services\api.ts

import axios from 'axios'

const api = axios.create({
baseURL: import.meta.env.VITE_endPoint,
})

// قبل از ارسال هر درخواست، توکن JWT را به هدر اضافه می‌کنیم
api.interceptors.request.use(
(config) => {
const token = localStorage.getItem('authToken')
if (token) {
config.headers.Authorization = `Bearer ${token}`
}
return config
},
(error) => Promise.reject(error),
)

// اگر پاسخ 401 دریافت شد، کاربر را به صفحه login هدایت می‌کنیم
api.interceptors.response.use(
(response) => response,
(error) => {
if (error.response?.status === 401) {
localStorage.removeItem('authToken')
window.location.href = '/login' // کاربر را به login بفرست
}
return Promise.reject(error)
},
)

export default api

**************************************************************************************************
# src\views\dashboard\DashboardView.vue 
<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="p-6 text-xl font-semibold text-gray-800 border-b">Admin Panel</div>
      <nav class="p-4 space-y-2">
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</a>
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100">Users</a>
        <a href="#" class="block px-4 py-2 rounded hover:bg-gray-100">Settings</a>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <!-- Content area -->
      <main class="p-6">
        <p class="text-gray-700 text-lg">
          Welcome to your dashboard. This is protected content visible only after login.
        </p>
        <!-- Add more dashboard components here -->
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>

**************************************************************************************************
# src\views\login\LoginView.vue 
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="loginForm.login"
          type="text"
          placeholder="Username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-600 mt-4 text-center text-sm">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const loginForm = ref({
  login: '',
  password: '',
})

const errorMessage = ref('')

// redirect if already authenticated
onMounted(() => {
  const token = localStorage.getItem('authToken')
  if (token) {
    router.push('/dashboard')
  }
})

const handleLogin = async () => {
  try {
    const response = await api.post('/login', loginForm.value)
    const token = response.data.token
    localStorage.setItem('authToken', token)
    router.push('/dashboard')
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>
    errorMessage.value = axiosError.response?.data?.message || 'Login failed. Please try again.'
  }
}
</script>

