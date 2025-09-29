<template>
  <v-group :config="{ x: 25, y: 30, draggable: false }">
    <template v-for="circlePot in circlePots" :key="circlePot.id">
      <!-- گلدان دایره‌ای -->
      <v-circle
        :config="{
          x: circlePot.x,
          y: circlePot.y,
          radius: circlePot.radius,
          fill: '#53392d',
          stroke: 'green',
          strokeWidth: 2,
          draggable: false,
        }"
      />
      <!-- آیکن اطلاعات -->
      <v-text
        :config="{
          text: 'ⓘ',
          x: circlePot.x - 10,
          y: circlePot.y - 10,
          fontSize: 14,
          fill: 'gold',
          cursor: 'pointer',
          draggable: false,
          listening: true,
        }"
        @click="openModal(circlePot)"
        @tap="openModal(circlePot)"
      />
    </template>
  </v-group>

  <!-- مدال نمایش اطلاعات -->
  <ModalComponent :show="isOpen" @close="isOpen = false">
    <div class="modal-content">
      <h3 class="text-xl font-semibold text-green-500 mb-2">{{ selectedPot?.name }}</h3>
      <p v-if="selectedPot?.radius !== undefined" class="mb-1">
        <strong>Radius:</strong> {{ selectedPot.radius }}
      </p>
      <p v-if="selectedPot?.lastRenovationDate" class="mb-1">
        <strong>Renovierungsdatum:</strong>
        {{ formatDate(selectedPot.lastRenovationDate) }}
      </p>
      <p class="mb-4"><strong>Beschreibung:</strong> {{ selectedPot?.beschreibung }}</p>

      <button
        @click="isOpen = false"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Close
      </button>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from '@/components/lageplan/ModalComponent.vue';

interface CirclePot {
  id: number;
  x: number;
  y: number;
  radius: number;
  name: string;
  beschreibung: string;
  lastRenovationDate?: string;
}

const circlePots = ref<CirclePot[]>([
  {
    id: 1,
    x: 600,
    y: 400,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-04-20',
  },
  {
    id: 2,
    x: 670,
    y: 400,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 3,
    x: 740,
    y: 400,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 4,
    x: 810,
    y: 400,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 5,
    x: 600,
    y: 470,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 6,
    x: 670,
    y: 470,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 7,
    x: 740,
    y: 470,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 8,
    x: 810,
    y: 470,
    radius: 30,
    name: 'Runder Blumenkübel',
    beschreibung: 'Ein runder Blumentopf aus Ton.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 9,
    x: 560,
    y: 820,
    radius: 17,
    name: 'Keramiktopf',
    beschreibung: 'Kleiner runder Keramiktopf.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 10,
    x: 560,
    y: 780,
    radius: 17,
    name: 'Keramiktopf',
    beschreibung: 'Kleiner runder Keramiktopf.',
    lastRenovationDate: '2025-06-01',
  },
  {
    id: 11,
    x: 560,
    y: 740,
    radius: 17,
    name: 'Keramiktopf',
    beschreibung: 'Kleiner runder Keramiktopf.',
    lastRenovationDate: '2025-06-01',
  },
]);

const isOpen = ref(false);
const selectedPot = ref<CirclePot | null>(null);

function openModal(pot: CirclePot) {
  selectedPot.value = pot;
  isOpen.value = true;
}

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('de-DE', options);
}
</script>
