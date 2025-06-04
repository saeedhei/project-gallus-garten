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

    <v-text
      :config="{
        x: 50,
        y: 10,
        text: '🌷',
        fontSize: 20,
      }"
    />

    <v-text
      :config="{
        x: 10,
        y: 30,
        text: '🌷',
        fontSize: 20,
      }"
    />

    <v-text
      :config="{
        x: 120,
        y: 12,
        text: '🌷',
        fontSize: 20,
      }"
    />

    <v-text
      :config="{
        x: 10,
        y: 10,
        text: '🐝',
        fontSize: 20,
      }"
    />
    <v-text
      :config="{
        x: 20,
        y: 20,
        text: '🐝',
        fontSize: 20,
      }"
    />
    <v-text
      :config="{
        x: 90,
        y: 30,
        text: '🐝',
        fontSize: 20,
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
