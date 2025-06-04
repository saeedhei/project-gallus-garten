<template>
  <v-group :config="{ x, y }">
    <!-- جدول بالا -->
    <v-rect
      :config="{
        x: 0,
        y: 0,
        width,
        height: borderHeight,
        fill: borderColor,
      }"
    />

    <!-- مسیر پیاده‌رو -->
    <v-rect
      :config="{
        x: 0,
        y: borderHeight + gap,
        width,
        height: pathHeight,
        fill: pathColor,
        stroke: pathStrokeColor,
        strokeWidth: pathStrokeWidth,
      }"
    />

    <!-- جدول پایین -->
    <v-rect
      :config="{
        x: 0,
        y: borderHeight + gap + pathHeight + gap,
        width,
        height: borderHeight,
        fill: borderColor,
      }"
    />
  </v-group>
</template>

<script setup lang="ts">
defineProps({
  x: {
    type: Number,
    default: 4,
  },
  y: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 1200,
  },
  borderHeight: {
    type: Number,
    default: 8,
  },
  pathHeight: {
    type: Number,
    default: 200,
  },
  gap: {
    type: Number,
    default: 1,
  },
  borderColor: {
    type: String,
    default: '#696969',
  },
  pathColor: {
    type: String,
    default: '#d3d3d3',
  },
  pathStrokeColor: {
    type: String,
    default: '#a9a9a9',
  },
  pathStrokeWidth: {
    type: Number,
    default: 2,
  },
})
</script>
