<!-- src\views\beitraege\BeitragDetailView.vue -->
<template>
  <main class="container mx-auto px-4 py-8 max-w-4xl">
    <div v-if="beitrag" class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Header with back button -->
      <div class="px-6 pt-6 pb-2 flex items-center">
        <RouterLink
          to="/beitraege"
          class="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Zurück zu Beiträgen
        </RouterLink>
      </div>

      <!-- Article content -->
      <article class="px-6 py-4">
        <!-- Category badge -->
        <span
          class="inline-block px-3 py-1 mb-4 text-sm font-semibold rounded-full bg-blue-100 text-blue-800"
        >
          {{ beitrag.category }}
        </span>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ beitrag.name }}</h1>

        <!-- Featured image -->
        <div class="rounded-lg overflow-hidden mb-6 shadow-md">
          <img
            :src="beitrag.image"
            :alt="beitrag.name"
            class="w-full h-auto object-cover max-h-96"
          />
        </div>

        <!-- Description -->
        <div class="prose max-w-none text-gray-700 mb-8">
          <p class="whitespace-pre-line">{{ beitrag.description }}</p>
        </div>

        <!-- Metadata -->
        <div class="border-t border-gray-200 pt-4 text-sm text-gray-500">
          Beitrag ID: {{ beitrag.id }}
        </div>
      </article>
    </div>

    <!-- Not found state -->
    <div v-else class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 class="mt-4 text-xl font-medium text-gray-700">Beitrag nicht gefunden</h2>
      <p class="mt-2 text-gray-500">Der angeforderte Beitrag konnte nicht geladen werden.</p>
      <RouterLink
        to="/beitraege"
        class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Zurück zur Übersicht
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

interface Beitrag {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const route = useRoute();
const id = Number(route.params.id);

const beitraege = ref<Beitrag[]>([]);
const beitrag = computed(() => beitraege.value.find((b) => b.id === id));

onMounted(async () => {
  const res = await fetch('/data/posts.json');
  beitraege.value = await res.json();
});
</script>
