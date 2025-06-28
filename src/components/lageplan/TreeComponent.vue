<template>
  <v-group :config="{ x, y, rotation, scaleX: scale, scaleY: scale, draggable: false }">
    <!-- تنه درخت -->
    <v-rect
      :config="{
        x: 12,
        y: 30,
        width: 6,
        height: 20,
        fill: '#8B4513',
      }"
    />
    <!-- برگ ها -->
    <v-circle
      :config="{
        x: 15,
        y: 25,
        radius: 15,
        fill: '#228B22',
        stroke: '#006400',
        strokeWidth: 2,
      }"
    />
  </v-group>
</template>

<script setup lang="ts">
defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  scale: { type: Number, default: 1 },
  rotation: { type: Number, default: 0 },
})
</script>
