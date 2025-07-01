<!-- src\views\dashboard\DashboardView.vue -->
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
        <p class="text-gray-700 text-lg">
          {{ dashboardMessage }}
        </p>
        <!-- Add more dashboard components here -->
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const dashboardMessage = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/v3/dashboard/');
    dashboardMessage.value = response.data.message;
  } catch (error) {
    console.error(error);
  }
});

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
};
</script>
