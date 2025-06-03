<template>
  <div>
    <!-- دکمه‌ها -->
    <button @click="toggleTrees" class="btn">
      {{ showTrees ? 'Bäume ausblenden' : 'Bäume anzeigen' }}
    </button>
    <button @click="toggleBeds" class="btn">
      {{ showBeds ? 'Beete ausblenden' : 'Beete anzeigen' }}
    </button>
    <button @click="toggleBenches" class="btn">
      {{ showBenches ? 'Bänke ausblenden' : 'Bänke anzeigen' }}
    </button>

    <!-- کنوا -->
    <v-stage :config="stageConfig">
      <v-layer>
        <!-- زمین باغ -->
        <v-rect
          :config="{
            x: 50,
            y: 50,
            width: 1200,
            height: 500,
            fill: '#98fb98',
            stroke: '#2e8b57',
            strokeWidth: 4,
          }"
        />

        <!-- درخت‌ها -->
        <template v-if="showTrees">
          <Tree
            v-for="tree in trees"
            :key="tree.id"
            :x="tree.x"
            :y="tree.y"
            :scale="tree.scale"
            :rotation="tree.rotation"
          />
        </template>

        <!-- باغچه‌ها -->
        <template v-if="showBeds">
          <v-rect
            v-for="bed in beds"
            :key="bed.id"
            :config="{
              x: bed.x,
              y: bed.y,
              width: bed.width,
              height: bed.height,
              fill: 'green',
              stroke: 'black',
              strokeWidth: 3,
              draggable: true,
            }"
          />
        </template>

        <!-- صندلی‌ها -->
        <template v-if="showBenches">
          <Bench
            v-for="bench in benches"
            :key="bench.id"
            :x="bench.x"
            :y="bench.y"
            :width="bench.width"
            :height="bench.height"
            :rotation="bench.rotation"
          />
        </template>
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bench from '@/components/lageplan/BenchComponent.vue'
import Tree from '@/components/lageplan/TreeComponent.vue'

const stageConfig = {
  width: 1800,
  height: 600,
}

// نمایش / پنهان‌سازی
const showTrees = ref(true)
const showBeds = ref(true)
const showBenches = ref(true)

// توابع تغییر وضعیت
const toggleTrees = () => (showTrees.value = !showTrees.value)
const toggleBeds = () => (showBeds.value = !showBeds.value)
const toggleBenches = () => (showBenches.value = !showBenches.value)

const beds = ref([
  { id: 1, x: 315, y: 300, width: 180, height: 60 },
  { id: 2, x: 500, y: 300, width: 180, height: 60 },
  { id: 3, x: 685, y: 220, width: 60, height: 180 },
])

const benches = ref([
  { id: 1, x: 200, y: 100, width: 140, height: 42, rotation: 0 },
  { id: 2, x: 600, y: 145, width: 140, height: 42, rotation: 180 },
  { id: 3, x: 900, y: 145, width: 140, height: 42, rotation: 180 },
])

const trees = ref([
  { id: 1, x: 200, y: 400, scale: 1, rotation: 0 },
  { id: 2, x: 350, y: 400, scale: 1.2, rotation: 0 },
  { id: 3, x: 450, y: 400, scale: 1.4, rotation: 0 },
  { id: 4, x: 500, y: 400, scale: 1, rotation: 0 },
])
</script>

<style scoped>
.btn {
  margin: 5px;
  padding: 8px 16px;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
