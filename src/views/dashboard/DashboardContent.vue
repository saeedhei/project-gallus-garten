<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Component Dashboard</h2>
    <p>This is the content for component Dashboard.</p>
    <p class="text-gray-700 text-lg">
      {{ dashboardMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const dashboardMessage = ref('');

onMounted(async () => {
  try {
    const response = await api.get('/v3/dashboard/');
    dashboardMessage.value = response.data.message;
  } catch (error) {
    console.error(error);
  }
});
</script>
