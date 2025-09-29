<template>
  <v-group :config="{ x: 25, y: 30, draggable: false }">
    <template v-for="diamondRect in diamondRects" :key="diamondRect.id">
      <!-- گروه لوزی + آیکن -->
      <v-group
        :config="{
          x: diamondRect.x,
          y: diamondRect.y,
          rotation: diamondRect.rotation,
          draggable: false,
        }"
      >
        <!-- لوزی مستطیل -->
        <v-line
          :config="{
            points: [
              0,
              -diamondRect.height / 2, // بالا
              diamondRect.width / 2,
              0, // راست
              0,
              diamondRect.height / 2, // پایین
              -diamondRect.width / 2,
              0, // چپ
            ],
            closed: true,
            fill: '#53392d',
            stroke: 'purple',
            strokeWidth: 2,
          }"
        />
        <!-- آیکن اطلاعات (همراه گروه می‌چرخه) -->
        <v-text
          :config="{
            text: 'ⓘ',
            x: -10,
            y: -10,
            fontSize: 14,
            fill: 'gold',
            cursor: 'pointer',
            draggable: false,
            listening: true,
          }"
          @click="openModal(diamondRect)"
          @tap="openModal(diamondRect)"
        />
      </v-group>
    </template>
  </v-group>

  <!-- مدال نمایش اطلاعات -->
  <ModalComponent :show="isOpen" @close="isOpen = false">
    <div class="modal-content">
      <h3 class="text-xl font-semibold text-purple-500 mb-2">{{ selectedBed?.name }}</h3>
      <p class="mb-1"><strong>Gärtner*in:</strong> {{ selectedBed?.gaertnerIn }}</p>
      <p v-if="selectedBed?.width !== undefined" class="mb-1">
        <strong>Breite:</strong> {{ selectedBed.width }}
      </p>
      <p v-if="selectedBed?.height !== undefined" class="mb-1">
        <strong>Höhe:</strong> {{ selectedBed.height }}
      </p>
      <p class="mb-4"><strong>Beschreibung:</strong> {{ selectedBed?.beschreibung }}</p>

      <button
        @click="isOpen = false"
        class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Close
      </button>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from '@/components/lageplan/ModalComponent.vue';

interface DiamondRect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  name: string;
  beschreibung: string;
  gaertnerIn: string;
}

const diamondRects = ref<DiamondRect[]>([
  {
    id: 1,
    x: 3160,
    y: 420,
    width: 190,
    height: 110,
    rotation: 0,
    name: 'Lusibett Rechteck',
    beschreibung: 'Ein hohes Beet in länglicher Rautenform.',
    gaertnerIn: 'Lisa Hoffmann',
  },
  {
    id: 2,
    x: 2960,
    y: 420,
    width: 190,
    height: 110,
    rotation: 0,
    name: 'Langes Rautenbeet',
    beschreibung: 'Ein schräges Hochbeet, rechteckig-rautenförmig.',
    gaertnerIn: 'Tobias Klein',
  },
  {
    id: 3,
    x: 3060,
    y: 525,
    width: 190,
    height: 110,
    rotation: 90,
    name: 'Langes Rautenbeet',
    beschreibung: 'Ein schräges Hochbeet, rechteckig-rautenförmig.',
    gaertnerIn: 'Tobias Klein',
  },
]);

const isOpen = ref(false);
const selectedBed = ref<DiamondRect | null>(null);

function openModal(bed: DiamondRect) {
  selectedBed.value = bed;
  isOpen.value = true;
}
</script>
