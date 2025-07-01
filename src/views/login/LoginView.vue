<!-- src\views\login\LoginView.vue -->
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
import { AxiosError } from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();

const loginForm = ref({
  login: '',
  password: '',
});

const errorMessage = ref('');

// redirect if already authenticated
onMounted(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    router.push('/dashboard');
  }
});

const handleLogin = async () => {
  try {
    const response = await api.post('/v3/auth/login', loginForm.value);
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    router.push('/dashboard');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    errorMessage.value = axiosError.response?.data?.message || 'Login failed. Please try again.';
  }
};
</script>
