<!-- src\views\beitraege\BeitraegeView.vue -->
<template>
  <section class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Beiträge</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <RouterLink
        v-for="beitrag in beitraege"
        :key="beitrag.id"
        :to="`/beitraege/${beitrag.id}`"
        class="beitrag-card group block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white"
      >
        <div class="relative overflow-hidden h-48">
          <img
            :src="beitrag.images[0]"
            :alt="beitrag.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div class="p-4">
          <h3
            class="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors"
          >
            {{ beitrag.name }}
          </h3>
          <p class="text-gray-600 line-clamp-2">
            {{ beitrag.description }}
          </p>
          <div class="mt-3">
            <span class="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
              {{ beitrag.category }}
            </span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import postsData from '@/assets/data/posts.json';

interface Beitrag {
  id: number;
  name: string;
  description: string;
  images: string[];
  category: string;
}

const beitraege = ref<Beitrag[]>([]);

onMounted(async () => {
  beitraege.value = postsData;
});
</script>
