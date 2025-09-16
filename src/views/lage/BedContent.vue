<template>
  <template v-for="bed in beds" :key="bed.id">
    <v-group
      :config="{
        x: bed.x,
        y: bed.y,
        rotation: bed.rotation || 0,
        draggable: false,
      }"
    >
      <!-- بدنه بستر -->
      <v-rect
        :config="{
          x: 0,
          y: 0,
          width: bed.width,
          height: bed.height,
          fill: '#53392d',
          stroke: bed.stroke || 'green',
          strokeWidth: 2,
        }"
      />

      <!-- گل‌ها -->
      <template v-for="(pos, i) in flowerPositions" :key="`flower-${bed.id}-${i}`">
        <v-group :config="{ x: pos.x, y: pos.y, scaleX: 0.6, scaleY: 0.6 }">
          <v-circle
            v-for="j in 5"
            :key="`petal-${i}-${j}`"
            :config="{
              x: Math.cos((j * 72 * Math.PI) / 180) * 12,
              y: Math.sin((j * 72 * Math.PI) / 180) * 12,
              radius: 6,
              fill: 'pink',
            }"
          />
          <v-circle :config="{ x: 0, y: 0, radius: 4, fill: 'yellow' }" />
        </v-group>
      </template>

      <!-- گیاه‌ها -->
      <template v-for="(pos, i) in plantPositions" :key="`plant-${bed.id}-${i}`">
        <v-group :config="{ x: pos.x, y: pos.y, scaleX: 0.6, scaleY: 0.6 }">
          <v-line
            :config="{
              points: [0, 0, 0, 30],
              stroke: '#228B22',
              strokeWidth: 3,
            }"
          />
          <v-ellipse
            :config="{
              x: -6,
              y: 10,
              radiusX: 6,
              radiusY: 12,
              fill: '#32CD32',
              rotation: -30,
            }"
          />
          <v-ellipse
            :config="{
              x: 6,
              y: 15,
              radiusX: 6,
              radiusY: 12,
              fill: '#32CD32',
              rotation: 30,
            }"
          />
          <v-ellipse
            :config="{
              x: 0,
              y: 5,
              radiusX: 5,
              radiusY: 10,
              fill: '#3CB371',
              rotation: 0,
            }"
          />
        </v-group>
      </template>
      <!-- آیکن اطلاعات -->
      <v-group
        @click="openModal(bed)"
        @tap="openModal(bed)"
        :config="{ x: 0, y: -20, cursor: 'pointer' }"
      >
        <v-text
          :config="{
            text: 'ⓘ',
            x: 0,
            y: 20,
            fontSize: 14,
            fill: 'gold',
            draggable: false,
          }"
        />
      </v-group>
    </v-group>
  </template>

  <!-- مدال -->
  <ModalComponent :show="isOpen" @close="isOpen = false">
    <div class="modal-content">
      <h3 class="text-xl font-semibold text-green-500 mb-2">{{ selectedBed?.name }}</h3>
      <p class="mb-1"><strong>Gärtner*in:</strong> {{ selectedBed?.gaertnerIn }}</p>
      <p v-if="selectedBed?.radius !== undefined" class="mb-1">
        <strong>Radius:</strong> {{ selectedBed.radius }}
      </p>
      <p v-if="selectedBed?.height !== undefined" class="mb-1">
        <strong>Height:</strong> {{ selectedBed.height }} cm
      </p>
      <p v-if="selectedBed?.width !== undefined" class="mb-1">
        <strong>Width:</strong> {{ selectedBed.width }} cm
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

interface Bed {
  id: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation?: number;
  name: string;
  beschreibung: string;
  gaertnerIn: string;
  isAntiRat?: boolean;
  lastRenovationDate?: string;
  stroke?: string;
}

const beds = ref<Bed[]>([
  {
    id: 1,
    x: 628,
    y: 960,
    width: 170,
    height: 90,
    rotation: 0,
    name: 'Marina 1',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2019-05-15',
    stroke: 'tomato',
  },
  {
    id: 2,
    x: 892,
    y: 880,
    width: 170,
    height: 90,
    rotation: 90,
    name: 'Marina 2',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2019-05-15',
    stroke: 'tomato',
  },
  {
    id: 3,
    x: 1186,
    y: 898,
    width: 150,
    height: 75,
    rotation: 90,
    name: 'Marina 3',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2019-05-15',
    stroke: 'tomato',
  },
  {
    id: 4,
    x: 785,
    y: 796,
    width: 160,
    height: 80,
    rotation: 0,
    name: 'Sonnenbeet 1',
    beschreibung: 'Hochbeet aus Stahl.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
    stroke: '#FFB74D',
  },
  {
    id: 5,
    x: 948,
    y: 796,
    width: 160,
    height: 80,
    rotation: 0,
    name: 'Sonnenbeet 2',
    beschreibung: 'Hochbeet aus Stahl.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
    stroke: '#FFB74D',
  },
  {
    id: 6,
    x: 1191,
    y: 734,
    width: 160,
    height: 80,
    rotation: 90,
    name: 'Sonnenbeet 3',
    beschreibung: 'Hochbeet aus Stahl.',
    gaertnerIn: 'Hannah Frank',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
    stroke: '#FFB74D',
  },
  {
    id: 7,
    x: 1189,
    y: 938,
    width: 210,
    height: 110,
    rotation: 0,
    name: 'JMD 1',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
    stroke: '#F48FB1',
  },
  {
    id: 8,
    x: 1420,
    y: 725,
    width: 210,
    height: 110,
    rotation: 90,
    name: 'JMD 2',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Dr. Shekiba Rahim',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
    stroke: '#F48FB1',
  },
  {
    id: 9,
    x: 1402,
    y: 938,
    width: 210,
    height: 110,
    rotation: 0,
    name: 'JMD 3',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2025-05-15',
    stroke: '#F48FB1',
  },
  {
    id: 10,
    x: 1380,
    y: 383,
    width: 135,
    height: 135,
    rotation: 0,
    name: 'EPAl 1',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2025-07-24',
  },
  {
    id: 11,
    x: 1545,
    y: 383,
    width: 135,
    height: 135,
    rotation: 0,
    name: 'EPAl 2',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2022-05-12',
  },
  {
    id: 12,
    x: 1710,
    y: 383,
    width: 135,
    height: 135,
    rotation: 0,
    name: 'EPAl 3',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: true,
    lastRenovationDate: '2025-08-14',
  },
  // {
  //   id: 13,
  //   x: 2582,
  //   y: 890,
  //   width: 160,
  //   height: 80,
  //   rotation: 90,
  //   name: 'Sonnenbeet 2',
  //   beschreibung: 'Hochbeet aus Stahl.',
  //   gaertnerIn: 'Gemeinsam',
  //   isAntiRat: true,
  //   lastRenovationDate: '2025-05-15',
  // },
  // {
  //   id: 14,
  //   x: 2585,
  //   y: 970,
  //   width: 160,
  //   height: 80,
  //   rotation: 0,
  //   name: 'Sonnenbeet 1',
  //   beschreibung: 'Hochbeet aus Stahl.',
  //   gaertnerIn: 'Gemeinsam',
  //   isAntiRat: true,
  //   lastRenovationDate: '2025-05-15',
  // },
  // {
  //   id: 15,
  //   x: 2828,
  //   y: 890,
  //   width: 160,
  //   height: 80,
  //   rotation: 90,
  //   name: 'Sonnenbeet 2',
  //   beschreibung: 'Hochbeet aus Stahl.',
  //   gaertnerIn: 'Gemeinsam',
  //   isAntiRat: true,
  //   lastRenovationDate: '2025-05-15',
  // },
  // {
  //   id: 16,
  //   x: 4582,
  //   y: 890,
  //   width: 160,
  //   height: 80,
  //   rotation: 90,
  //   name: 'Sonnenbeet 2',
  //   beschreibung: 'Hochbeet aus Stahl.',
  //   gaertnerIn: 'Gemeinsam',
  //   isAntiRat: true,
  //   lastRenovationDate: '2025-05-15',
  // },
  // {
  //   id: 17,
  //   x: 4585,
  //   y: 970,
  //   width: 160,
  //   height: 80,
  //   rotation: 0,
  //   name: 'Sonnenbeet 1',
  //   beschreibung: 'Hochbeet aus Stahl.',
  //   gaertnerIn: 'Gemeinsam',
  //   isAntiRat: true,
  //   lastRenovationDate: '2025-05-15',
  // },
  // {
  //   id: 18,
  //   x: 4828,
  //   y: 890,
  //   width: 160,
  //   height: 80,
  //   rotation: 90,
  //   name: 'Sonnenbeet 2',
  //   beschreibung: 'Hochbeet aus Stahl.',
  //   gaertnerIn: 'Gemeinsam',
  //   isAntiRat: true,
  //   lastRenovationDate: '2025-05-15',
  // },
  {
    id: 19,
    x: 3430,
    y: 383,
    width: 150,
    height: 95,
    rotation: 0,
    name: 'Günderrodeschule 1',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2023-03-12',
  },
  {
    id: 20,
    x: 3428,
    y: 383,
    width: 248,
    height: 95,
    rotation: 90,
    name: 'Günderrodeschule 2',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2023-03-12',
  },
  {
    id: 21,
    x: 3430,
    y: 536,
    width: 150,
    height: 95,
    rotation: 0,
    name: 'Günderrodeschule 3',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2023-03-12',
  },
  {
    id: 21,
    x: 4123,
    y: 383,
    width: 120,
    height: 80,
    rotation: 0,
    name: 'Goldknolle 1',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2023-03-12',
  },
  {
    id: 22,
    x: 4463,
    y: 383,
    width: 120,
    height: 80,
    rotation: 0,
    name: 'Goldknolle 2',
    beschreibung: 'Hochbeet aus Holz.',
    gaertnerIn: 'Gemeinsam',
    isAntiRat: false,
    lastRenovationDate: '2023-03-12',
  },
]);

const flowerPositions = [
  { x: 40, y: 40 },
  { x: 100, y: 60 },
  { x: 100, y: 20 },
];

const plantPositions = [
  { x: 20, y: 20 },
  { x: 60, y: 50 },
  { x: 80, y: 20 },
  { x: 140, y: 50 },
  { x: 140, y: 10 },
];

const isOpen = ref(false);
const selectedBed = ref<Bed | null>(null);

function openModal(bed: Bed) {
  // console.log('Opening modal for bed:', bed);
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
