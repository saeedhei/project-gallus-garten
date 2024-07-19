<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Project {
  name: string
  description: string
  image: string
}

const projects = ref<Project[]>([])

const fetchProducts = async () => {
  try {
    const response = await fetch('/data/projects.json')
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    const data = await response.json()
    // products.value = data;
    projects.value = data.slice(-3)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <section
    class="bg-gray-100 flex flex-col text-center py-16 px-4 lg:px-16 md:px-8 xl:px-24 xxl:px-40"
  >
    <div>
      <h2 class="text-2xl font-bold leading-tight tracking-tight sm:text-3xl font-heading">
        Wie sind unsere Projekte?
      </h2>
    </div>

    <div class="mt-12 sm:flex items-start justify-between sm:-mx-2">
      <div
        class="project-container w-full bg-white rounded-lg shadow-lg py-8 px-4 sm:w-1/3 sm:mx-2 lg:mx-6"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="h-48">
          <img :src="project.image" alt="" class="mx-auto h-full object-cover" />
        </div>
        <h4 class="font-semibold leading-tight text-md uppercase text-green-600 font-bold mt-10">
          {{ project.name }}
        </h4>
        <p class="text-base text-gray-600 mt-2">
          {{ project.description }}
        </p>
      </div>
    </div>

    <div class="mt-16 w-full sm:max-w-2xl sm:mx-auto">
      <p class="text-md font-bold text-gray-900 lg:text-xl">
        “ In der Natur finden wir Ruhe und Inspiration. Schützen wir gemeinsam unseren Garten für
        kommende Generationen. ”
      </p>
      <p class="text-green-500 font-bold mt-4">Ralf Harth</p>
      <p class="text-gray-600">Gründer + Vorstand</p>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 1024px) {
  .project-container {
    transition: transform 0.3s ease;
  }
  .project-container:hover {
    transform: rotateY(10deg) rotateX(10deg) scale(1.1);
  }
}
</style>
