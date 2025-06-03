<template>
  <v-group :config="{ x, y, rotation, draggable: true }">
    <!-- نشیمن -->
    <v-rect
      :config="{
        x: 0,
        y: 10,
        width,
        height: height - 10,
        fill: '#8b4513',
        cornerRadius: 5,
      }"
    />
    <!-- پشتی -->
    <v-rect
      :config="{
        x: 0,
        y: 0,
        width,
        height: 10,
        fill: '#654321',
        cornerRadius: 3,
      }"
    />
    <!-- پایه‌ها -->
    <v-rect
      :config="{
        x: 5,
        y: height,
        width: 5,
        height: 5,
        fill: '#4b2e05',
      }"
    />
    <v-rect
      :config="{
        x: width - 10,
        y: height,
        width: 5,
        height: 5,
        fill: '#4b2e05',
      }"
    />
  </v-group>
</template>

<script setup lang="ts">
defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, default: 30 },
  height: { type: Number, default: 15 },
  rotation: { type: Number, default: 0 },
})
</script>
