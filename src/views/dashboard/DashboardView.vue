<!-- src\views\dashboard\DashboardView.vue -->
<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar for desktop -->
    <aside class="w-64 bg-white shadow-md hidden md:block fixed h-full">
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
    <div class="flex-1 flex flex-col md:ml-64">
      <!-- Header -->
      <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <!-- Mobile menu button - now in header -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none md:hidden"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-gray-800">{{ currentView.replace('Content', '') }}</h1>
        </div>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <!-- Mobile sidebar -->
      <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside v-if="isMobileMenuOpen" class="w-64 bg-white shadow-md fixed h-full z-40 md:hidden">
          <div class="p-6 text-xl font-semibold text-gray-800 border-b">Admin Panel</div>
          <nav class="p-4 space-y-2">
            <a
              href="#"
              class="block px-4 py-2 rounded hover:bg-gray-100"
              :class="{ 'bg-gray-200 font-bold': currentView === 'DashboardContent' }"
              @click.prevent="
                currentView = 'DashboardContent';
                isMobileMenuOpen = false;
              "
              >Dashboard</a
            >
            <a
              href="#"
              class="block px-4 py-2 rounded hover:bg-gray-100"
              :class="{ 'bg-gray-200 font-bold': currentView === 'UsersContent' }"
              @click.prevent="
                currentView = 'UsersContent';
                isMobileMenuOpen = false;
              "
              >Users</a
            >
            <a
              href="#"
              class="block px-4 py-2 rounded hover:bg-gray-100"
              :class="{ 'bg-gray-200 font-bold': currentView === 'SettingsContent' }"
              @click.prevent="
                currentView = 'SettingsContent';
                isMobileMenuOpen = false;
              "
              >Settings</a
            >
          </nav>
        </aside>
      </transition>

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
import UsersContent from './users/UsersContent.vue';
import SettingsContent from './SettingsContent.vue';

const router = useRouter();
const currentView = ref<'DashboardContent' | 'UsersContent' | 'SettingsContent'>(
  'DashboardContent',
);
const isMobileMenuOpen = ref(false);

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
