<template>
  <div class="relative h-screen overflow-hidden">
    <!-- نقشه و عناصر آن -->
    <v-stage ref="stageRef" :config="stageConfig" @wheel="handleWheel" :draggable="true">
      <v-layer>
        <v-group :config="{ x: 0, y: 0, draggable: true }">
          <!-- مسیر پیاده‌رو -->
          <Walkway :x="4" :y="0" />
          <!-- زمین باغ -->
          <v-rect
            :config="{
              x: 4,
              y: 219,
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
            <GardenBed
              v-for="bed in beds"
              :key="bed.id"
              :x="bed.x"
              :y="bed.y"
              :width="bed.width"
              :height="bed.height"
              :rotation="bed.rotation"
            />
          </template>

          <!-- باغچه‌های زنبور وحشی -->
          <template v-if="showWildBeeBeds">
            <WildBeeBed
              v-for="bed in wildBeeBeds"
              :key="bed.id"
              :x="bed.x"
              :y="bed.y"
              :width="bed.width"
              :height="bed.height"
              :flowers="bed.flowers"
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
        </v-group>
      </v-layer>
    </v-stage>

    <!-- دکمه‌های تنظیمات پایین صفحه -->
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div class="relative">
        <button
          @click="showMenu = !showMenu"
          class="bg-green-600 text-white p-3 rounded-full shadow-lg"
        >
          ⚙️
          <!-- آیکون تنظیمات -->
        </button>
        <transition name="fade">
          <div
            v-if="showMenu"
            class="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-4 space-y-2"
          >
            <button @click="toggleTrees" class="btn">
              {{ showTrees ? 'Bäume ausblenden' : 'Bäume anzeigen' }}
            </button>
            <button @click="toggleBeds" class="btn">
              {{ showBeds ? 'Beete ausblenden' : 'Beete anzeigen' }}
            </button>
            <button @click="toggleWildBeeBeds" class="btn">
              {{ showWildBeeBeds ? 'Wildbienen-Beete ausblenden' : 'Wildbienen-Beete anzeigen' }}
            </button>
            <button @click="toggleBenches" class="btn">
              {{ showBenches ? 'Bänke ausblenden' : 'Bänke anzeigen' }}
            </button>
            <button
              @click="resetView"
              class="w-full text-left px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow"
            >
              Ansicht zurücksetzen
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Konva from 'konva'
import { ref, onMounted } from 'vue'
import Tree from '@/components/lageplan/TreeComponent.vue'
import Bench from '@/components/lageplan/BenchComponent.vue'
import WildBeeBed from '@/components/lageplan/WildBeeBed.vue'
import GardenBed from '@/components/lageplan//GardenBed.vue'
import Walkway from '@/components/lageplan/WalkwayComponent.vue'

Konva.hitOnDragEnabled = true

const stageRef = ref()
const stageConfig = { width: window.innerWidth, height: window.innerHeight }
const showMenu = ref(false)

const showTrees = ref(true)
const showBeds = ref(true)
const showWildBeeBeds = ref(true)
const showBenches = ref(true)

const toggleTrees = () => (showTrees.value = !showTrees.value)
const toggleBeds = () => (showBeds.value = !showBeds.value)
const toggleBenches = () => (showBenches.value = !showBenches.value)
const toggleWildBeeBeds = () => (showWildBeeBeds.value = !showWildBeeBeds.value)

const resetView = () => {
  const stage = stageRef.value?.getStage()
  if (stage) {
    stage.position({ x: 0, y: 0 })
    stage.scale({ x: 1, y: 1 })
    stage.batchDraw()
  }
}

const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
  e.evt.preventDefault()
  const stage = stageRef.value?.getStage()
  if (!stage) return

  const oldScale = stage.scaleX()
  const pointer = stage.getPointerPosition()
  if (!pointer) return

  const scaleBy = 1.05
  const direction = e.evt.deltaY > 0 ? -1 : 1
  const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  }

  stage.scale({ x: newScale, y: newScale })
  stage.position({
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  })
  stage.batchDraw()
}

type Point = { x: number; y: number }

let lastCenter: Point | null = null
let lastDist: number = 0
let dragStopped = false

function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

function getCenter(p1: Point, p2: Point): Point {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }
}

onMounted(() => {
  const stage = stageRef.value.getStage()

  stage.on('touchmove', (e: Konva.KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault()
    const touch1 = e.evt.touches[0]
    const touch2 = e.evt.touches[1]

    if (touch1 && !touch2 && !stage.isDragging() && dragStopped) {
      stage.startDrag()
      dragStopped = false
    }

    if (touch1 && touch2) {
      if (stage.isDragging()) {
        dragStopped = true
        stage.stopDrag()
      }

      const p1: Point = { x: touch1.clientX, y: touch1.clientY }
      const p2: Point = { x: touch2.clientX, y: touch2.clientY }

      if (!lastCenter) {
        lastCenter = getCenter(p1, p2)
        return
      }

      const newCenter = getCenter(p1, p2)
      const dist = getDistance(p1, p2)

      if (!lastDist) lastDist = dist

      const pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      }

      const scale = stage.scaleX() * (dist / lastDist)

      stage.scale({ x: scale, y: scale })

      const dx = newCenter.x - lastCenter.x
      const dy = newCenter.y - lastCenter.y

      const newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      }

      stage.position(newPos)

      lastDist = dist
      lastCenter = newCenter
    }
  })

  stage.on('touchend', () => {
    lastDist = 0
    lastCenter = null
  })

  window.addEventListener('resize', () => {
    stage.width(window.innerWidth)
    stage.height(window.innerHeight)
    stage.batchDraw()
  })
})

const beds = ref([
  { id: 1, x: 315, y: 500, width: 160, height: 80, rotation: 0 },
  { id: 2, x: 480, y: 500, width: 160, height: 80, rotation: 0 },
  { id: 3, x: 725, y: 450, width: 160, height: 80, rotation: 90 },
])

const wildBeeBeds = ref([
  {
    id: 1,
    x: 100,
    y: 5,
    width: 200,
    height: 60,
    flowers: [
      { x: 20, y: 20, color: 'pink' },
      { x: 40, y: 30, color: 'purple' },
      { x: 80, y: 40, color: 'orange' },
    ],
  },
  {
    id: 2,
    x: 600,
    y: 5,
    width: 200,
    height: 60,
    flowers: [
      { x: 30, y: 10, color: 'red' },
      { x: 60, y: 30, color: 'yellow' },
      { x: 90, y: 20, color: 'blue' },
    ],
  },
])

const benches = ref([
  { id: 1, x: 500, y: 270, width: 140, height: 42, rotation: 180 },
  { id: 2, x: 1000, y: 270, width: 140, height: 42, rotation: 180 },
])

const trees = ref([
  { id: 1, x: 100, y: 650, scale: 1, rotation: 0 },
  { id: 2, x: 300, y: 650, scale: 1.2, rotation: 0 },
  { id: 3, x: 500, y: 620, scale: 1.4, rotation: 0 },
  { id: 4, x: 700, y: 650, scale: 1, rotation: 0 },
  { id: 5, x: 900, y: 650, scale: 1.2, rotation: 0 },
  { id: 6, x: 1100, y: 650, scale: 1.2, rotation: 0 },
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
