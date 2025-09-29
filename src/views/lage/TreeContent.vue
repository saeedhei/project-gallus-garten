<template>
  <template v-for="tree in trees" :key="tree.id">
    <!-- دایره حفاظتی -->
    <v-circle
      :config="{
        x: tree.x + 15,
        y: tree.y + 25,
        radius: 90,
        stroke: 'red',
        strokeWidth: 4,
        dash: [10, 10],
        opacity: 0.8,
      }"
    />

    <!-- گروه درخت (با offset از مرکز) -->
    <v-group
      :config="{
        x: tree.x + 15,
        y: tree.y + 25,
        rotation: tree.rotation,
        scaleX: tree.scale,
        scaleY: tree.scale,
        offsetX: 15,
        offsetY: 25,
        draggable: false,
      }"
    >
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

      <!-- برگ‌ها -->
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const trees = ref([
  { id: 3, x: 990, y: 950, scale: 1, rotation: 0 },
  { id: 4, x: 2400, y: 950, scale: 1.4, rotation: 0 },
  // { id: 5, x: 1500, y: 1050, scale: 1.2, rotation: 0 },
  // { id: 6, x: 1700, y: 1050, scale: 1.2, rotation: 0 },
]);
</script>
