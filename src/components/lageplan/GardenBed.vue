<template>
  <v-group>
    <!-- بدنه باغچه -->
    <v-rect
      :config="{
        x: 0,
        y: 0,
        width,
        height,
        fill: '#53392d',
        stroke: 'green',
        strokeWidth: 2,
      }"
    />

    <!-- گل‌ها -->
    <template v-for="(pos, i) in flowerPositions" :key="`flower-${i}`">
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
    <template v-for="(pos, i) in plantPositions" :key="`plant-${i}`">
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
  </v-group>
</template>

<script setup lang="ts">
defineProps({
  width: Number,
  height: Number,
})

const flowerPositions = [
  { x: 40, y: 40 },
  { x: 100, y: 60 },
  { x: 100, y: 20 },
]

const plantPositions = [
  { x: 20, y: 20 },
  { x: 60, y: 50 },
  { x: 80, y: 20 },
  { x: 140, y: 50 },
  { x: 140, y: 10 },
]
</script>
