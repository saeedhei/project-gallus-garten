<template>
  <v-group :config="{ x, y, draggable: true }">
    <!-- بدنه باغچه -->
    <v-rect
      :config="{
        width,
        height,
        fill: 'green',
        stroke: '#facc15',
        strokeWidth: 3,
        cornerRadius: 8,
      }"
    />

    <!-- گل‌ها -->
    <v-circle
      v-for="(flower, index) in flowers"
      :key="index"
      :config="{
        x: flower.x,
        y: flower.y,
        radius: 4,
        fill: flower.color,
      }"
    />
  </v-group>
</template>

<script setup lang="ts">
defineProps<{
  x: number
  y: number
  width: number
  height: number
  flowers: { x: number; y: number; color: string }[]
}>()
</script>
