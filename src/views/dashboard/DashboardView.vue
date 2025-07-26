<!-- src\views\dashboard\DashboardView.vue -->
<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="p-6 text-xl font-semibold text-gray-800 border-b">Admin Panel</div>
      <nav class="p-4 space-y-2">
        <a
          href="#"
          class="block px-4 py-2 rounded hover:bg-gray-100"
          :class="{ 'bg-gray-200 font-bold': currentView === 'DashboardContent' }"
          @click.prevent="currentView = 'DashboardContent'"
          >Dashboard</a
        >
        <a
          href="#"
          class="block px-4 py-2 rounded hover:bg-gray-100"
          :class="{ 'bg-gray-200 font-bold': currentView === 'UsersContent' }"
          @click.prevent="currentView = 'UsersContent'"
          >Users</a
        >
        <a
          href="#"
          class="block px-4 py-2 rounded hover:bg-gray-100"
          :class="{ 'bg-gray-200 font-bold': currentView === 'SettingsContent' }"
          @click.prevent="currentView = 'SettingsContent'"
          >Settings</a
        >
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

      <!-- Dynamic Content Area -->
      <main class="p-6">
        <component :is="viewComponents[currentView]" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardContent from './DashboardContent.vue';
import UsersContent from './users/UsersContent.vue'; // Optional
import SettingsContent from './SettingsContent.vue';
const router = useRouter();
const currentView = ref<'DashboardContent' | 'UsersContent' | 'SettingsContent'>(
  'DashboardContent',
);
const viewComponents = {
  DashboardContent,
  UsersContent,
  SettingsContent,
};

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
};
</script>
