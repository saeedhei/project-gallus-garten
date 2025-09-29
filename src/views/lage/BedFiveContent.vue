<!-- src\views\lage\BedFiveContent.vue -->
<template>
  <v-group :config="{ x: 25, y: 30, draggable: false }">
    <template v-for="FiveBed in FiveBeds" :key="FiveBed.id">
      <!-- آیکن اطلاعات -->

      <!-- تخت پنج‌ضلعی -->
      <v-regular-polygon
        :config="{
          x: FiveBed.x,
          y: FiveBed.y,
          sides: 5,
          radius: FiveBed.radius,
          fill: '#53392d',
          stroke: 'green',
          strokeWidth: 2,
          draggable: false,
          rotation: FiveBed.rotation,
        }"
      />
      <v-text
        :config="{
          text: 'ⓘ',
          x: FiveBed.x - 10,
          y: FiveBed.y - 10,
          fontSize: 14,
          fill: 'gold',
          cursor: 'pointer',
          draggable: false,
          listening: true,
        }"
        @click="openModal(FiveBed)"
        @tap="openModal(FiveBed)"
      />
    </template>
  </v-group>

  <!-- مدال نمایش اطلاعات -->
  <ModalComponent :show="isOpen" @close="isOpen = false">
    <div class="modal-content">
      <h3 class="text-xl font-semibold text-green-500 mb-2">{{ selectedBed?.name }}</h3>
      <p class="mb-1"><strong>Gärtner*in:</strong> {{ selectedBed?.gaertnerIn }}</p>
      <p v-if="selectedBed?.radius !== undefined" class="mb-1">
        <strong>Radius:</strong> {{ selectedBed.radius }}
      </p>
      <p v-if="selectedBed?.isAntiRat !== undefined" class="mb-1">
        <strong>🐭 Anti-Ratte:</strong>
        <span :class="selectedBed.isAntiRat ? 'text-green-600' : 'text-red-600'">
          {{ selectedBed.isAntiRat ? '✅ Ja' : '❌ Nein' }}
        </span>
      </p>
      <p v-if="selectedBed?.lastRenovationDate" class="mb-1">
        <strong>Renovierungsdatum:</strong>
        {{ formatDate(selectedBed.lastRenovationDate) }}
      </p>
      <p class="mb-4"><strong>Beschreibung:</strong> {{ selectedBed?.beschreibung }}</p>

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

interface FiveBed {
  id: number;
  x: number;
  y: number;
  radius: number;
  rotation: number;
  name: string;
  beschreibung: string;
  gaertnerIn: string;
  isAntiRat?: boolean;
  lastRenovationDate?: string;
}

const FiveBeds = ref<FiveBed[]>([
  {
    id: 1,
    x: 505,
    y: 943,
    radius: 42.5,
    rotation: 90,
    name: 'Fünfeckgarten',
    beschreibung: 'Fünfeckiges Hochbett aus Holz.',
    gaertnerIn: 'Ralf Harth',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
  },
  {
    id: 2,
    x: 565,
    y: 985,
    radius: 42.5,
    rotation: 197,
    name: 'Sternhof',
    beschreibung: 'Fünfeckiges Hochbett aus Holz.',
    gaertnerIn: 'Ralf Harth',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
  },
  {
    id: 3,
    x: 564,
    y: 900,
    radius: 42.5,
    rotation: -18,
    name: 'Pentagarten',
    beschreibung: 'Fünfeckiges Hochbett aus Holz.',
    gaertnerIn: 'Ralf Harth',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
  },
]);

const isOpen = ref(false);
const selectedBed = ref<FiveBed | null>(null);

function openModal(bed: FiveBed) {
  selectedBed.value = bed;
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
