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

    <!-- گروه درخت واقعی -->
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
      <!-- عکس درخت -->
      <v-image
        v-if="myImage"
        :config="{
          image: myImage,
          x: -60, // تنظیم افست تا عکس از مرکز نمایش داده بشه
          y: -47,
          width: 150,
          height: 150,
        }"
      />
    </v-group>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const myImage = ref<HTMLImageElement | null>(null);

const trees = ref([
  { id: 3, x: 990, y: 950, scale: 1, rotation: 0 },
  { id: 4, x: 2400, y: 950, scale: 1.26, rotation: 0 },
]);

onMounted(() => {
  const img = new Image();
  img.src = '/images/lageplan/tree.webp';

  img.onload = () => {
    myImage.value = img;
  };
});
</script>
