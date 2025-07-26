<template>
  <template v-for="tree in trees" :key="tree.id">
    <v-group
      :config="{
        x: tree.x,
        y: tree.y,
        rotation: tree.rotation,
        scaleX: tree.scale,
        scaleY: tree.scale,
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const trees = ref([
  { id: 3, x: 990, y: 950, scale: 1, rotation: 0 },
  { id: 4, x: 1300, y: 1050, scale: 1, rotation: 0 },
  { id: 5, x: 1500, y: 1050, scale: 1.2, rotation: 0 },
  { id: 6, x: 1700, y: 1050, scale: 1.2, rotation: 0 },
]);
</script>
