<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Projekte</h1>

    <!-- 🔍 Multiselect Status Filter -->
    <div class="mb-6 text-center">
      <label class="block mb-2 text-sm font-medium">Status filtern:</label>
      <Multiselect
        v-model="selectedStatuses"
        :options="statusOptions"
        :multiple="true"
        :close-on-select="false"
        placeholder="Status auswählen"
        class="w-full max-w-md mx-auto text-left"
      />
    </div>

    <!-- 📋 Project Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="relative bg-white rounded-2xl shadow-md overflow-hidden"
      >
        <img :src="project.image" :alt="project.title" class="h-48 w-full object-cover" />
        <div class="p-4 space-y-2">
          <h2 class="text-xl font-semibold">{{ project.title }}</h2>
          <p class="text-gray-600 text-sm">{{ project.description }}</p>
          <p class="text-xs text-gray-500">Ideengeber: {{ project.ideator }}</p>
        </div>
        <div
          :class="[
            'absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full text-white shadow',
            statusColor(project.status),
          ]"
        >
          {{ project.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import type { Project } from '@/types/Project';

// Available status options
const statusOptions = [
  'In Bearbeitung',
  'Abgeschlossen',
  'Archiviert',
  'Geplant',
  'Angehalten',
  'Storniert',
];

// Multiselect reactive state
const selectedStatuses = ref<string[]>([]);

// Projects data
const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Projekt Garten Gallus',
    description: 'Renovierung der Grünfläche und Gestaltung einer natürlichen Landschaft.',
    image: '/images/placeholder-image.webp',
    status: 'In Bearbeitung',
    ideator: 'Ralf Harth',
  },
  {
    id: 2,
    title: 'Zentrale Grünanlage',
    description: 'Anlage eines öffentlichen Parks mit moderner Beleuchtung.',
    image: '/images/placeholder-image.webp',
    status: 'Geplant',
    ideator: 'Ralf Harth',
  },
  {
    id: 3,
    title: 'Kultureller Bereich',
    description: 'Errichtung eines kulturellen und pädagogischen Freiraums.',
    image: '/images/placeholder-image.webp',
    status: 'Archiviert',
    ideator: 'Ralf Harth',
  },
  {
    id: 4,
    title: 'Garten-Wasseranschluss',
    description: 'Installation eines Wasserhahns zur besseren Bewässerung des Gartens.',
    image:
      'https://tgabara.com/wp-content/uploads/2021/02/%D8%A2%D8%A8%D9%BE%D8%A7%D8%B4-%D9%BE%D9%84%DB%8C%D9%85%D8%B1%DB%8C.jpg',
    status: 'Abgeschlossen',
    ideator: 'Saeed Heidarizarei',
  },
  {
    id: 5,
    title: 'Dach für Garten',
    description:
      'Bau eines schützenden Dachs im Garten, um Sitzbereiche vor Regen und Sonne zu bewahren.',
    image: '/images/placeholder-image.webp',
    status: 'Angehalten',
    ideator: 'Ralf Harth',
  },
  {
    id: 6,
    title: 'Digitalisierung für Alle',
    description:
      'Kostenlose Programmierkurse für alle Altersgruppen zur Förderung digitaler Fähigkeiten.',
    image: '/images/placeholder-image.webp',
    status: 'In Bearbeitung',
    ideator: 'Saeed Heidarizarei',
  },
]);

// Filter projects based on the selected statuses
const filteredProjects = computed(() => {
  if (selectedStatuses.value.length === 0) return projects.value;
  return projects.value.filter((p) => selectedStatuses.value.includes(p.status));
});

// Function to return the appropriate Tailwind color for a status badge
function statusColor(status: string): string {
  switch (status) {
    case 'In Bearbeitung':
      return 'bg-yellow-500';
    case 'Abgeschlossen':
      return 'bg-green-600';
    case 'Archiviert':
      return 'bg-gray-500';
    case 'Geplant':
      return 'bg-blue-500';
    case 'Angehalten':
      return 'bg-orange-500';
    case 'Storniert':
      return 'bg-red-600';
    default:
      return 'bg-black';
  }
}
</script>
