<!-- src\views\dashboard\users\UsersContent.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Benutzerliste</h2>

    <div v-if="loading" class="text-gray-600">Lade Benutzer...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col space-y-4"
      >
        <!-- Avatar and Name -->
        <div class="flex items-center space-x-4">
          <img
            :src="
              user.avatar ||
              'https://dfge.de/wp-content/uploads/blank-profile-picture-973460_640.png'
            "
            alt="Avatar"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div class="text-lg font-semibold text-gray-900">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="text-sm text-gray-500">{{ user.rolle }}</div>
          </div>
        </div>

        <!-- User Details -->
        <div class="text-sm text-gray-600 space-y-1">
          <div><span class="font-medium text-gray-700">ID-Nummer:</span> {{ user.idNummer }}</div>
          <div><span class="font-medium text-gray-700">Adresse:</span> {{ user.address }}</div>
          <div>
            <span class="font-medium text-gray-700">Beigetreten am:</span> {{ user.joinDate }}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          <router-link
            :to="{
              path: '/dashboard/ehrenamtsnachweis',
              query: {
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                address: user.address,
                // activities: JSON.stringify(user.activities2025),
              },
            }"
            class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
          >
            🏅&nbsp;Ehrenamtsnachweis
          </router-link>
          <button class="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
            💳&nbsp;Mitgliedskarte
          </button>
          <router-link
            :to="{
              path: '/dashboard/arbeitszeiten',
              query: {
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                activities: JSON.stringify(user.activities2025),
              },
            }"
            class="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded"
          >
            ⏱️&nbsp;Arbeitszeiten
          </router-link>
          <router-link
            :to="{
              path: '/werkzeuge/quittung',
              query: {
                name: user.firstName + ' ' + user.lastName,
                address: user.address,
              },
            }"
            class="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded"
          >
            🧾&nbsp;Quittung
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';

interface User {
  id: number;
  idNummer: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  rolle: string;
  joinDate: string;
  activities2025: Array<{
    date: string;
    startTime: string;
    endTime: string;
    activityType: string;
  }>;
}

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const { data } = await api.get<User[]>('/v3/dashboard/users');
    // console.log('Users data:', data);
    users.value = data;
  } catch (err) {
    console.error('API Error:', err);
    error.value = 'Fehler beim Laden der Benutzer.';
  } finally {
    loading.value = false;
  }
});
</script>
