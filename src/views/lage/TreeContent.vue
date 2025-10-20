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

    <!-- گروه متن و پس‌زمینه ID -->
    <v-group
      :config="{
        x: tree.x,
        y: tree.y + 110, // زیر درخت
      }"
    >
      <!-- پس‌زمینه سفید -->
      <v-rect
        :config="{
          width: 80,
          height: 32,
          fill: 'white',
          cornerRadius: 6,
          opacity: 0.8,
          offsetX: -10, // کمی چپ‌تر برای وسط‌چین شدن
          offsetY: 25,
        }"
      />
      <!-- متن ID -->
      <v-text
        :config="{
          text: 'ID: ' + tree.id,
          fontSize: 24,
          fill: 'black',
          x: 11,
          y: -20,
        }"
      />
    </v-group>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const myImage = ref<HTMLImageElement | null>(null);

const trees = ref([
  { id: 65, x: 11230, y: 950, scale: 1.2, rotation: 0 },
  { id: 66, x: 10390, y: 950, scale: 1.2, rotation: 0 },
  { id: 67, x: 9800, y: 950, scale: 1.2, rotation: 0 },
  { id: 68, x: 9200, y: 950, scale: 0.8, rotation: 0 },
  { id: 69, x: 8400, y: 950, scale: 1.2, rotation: 0 },
  { id: 70, x: 8000, y: 950, scale: 0.8, rotation: 0 },
  { id: 71, x: 7500, y: 950, scale: 1.2, rotation: 0 },
  { id: 72, x: 7000, y: 950, scale: 1.2, rotation: 0 },
  { id: 73, x: 6300, y: 950, scale: 1.2, rotation: 0 },
  { id: 74, x: 5700, y: 950, scale: 1.2, rotation: 0 },
  { id: 75, x: 5000, y: 950, scale: 1.2, rotation: 0 },
  { id: 76, x: 4200, y: 950, scale: 0.8, rotation: 0 },
  { id: 77, x: 3200, y: 950, scale: 0.8, rotation: 0 },
  { id: 78, x: 2700, y: 950, scale: 1.2, rotation: 0 },
  { id: 79, x: 990, y: 950, scale: 1.2, rotation: 0 },
  //
  { id: 379, x: 10900, y: 65, scale: 1.2, rotation: 0 },
  { id: 378, x: 10100, y: 65, scale: 0.8, rotation: 0 },
  { id: 377, x: 9500, y: 65, scale: 1.2, rotation: 0 },
  { id: 376, x: 8800, y: 65, scale: 1.2, rotation: 0 },
  { id: 375, x: 8000, y: 65, scale: 1.2, rotation: 0 },
  { id: 374, x: 7300, y: 65, scale: 1.2, rotation: 0 },
  { id: 373, x: 6700, y: 65, scale: 1.2, rotation: 0 },
  { id: 372, x: 6000, y: 65, scale: 1.2, rotation: 0 },
  { id: 371, x: 5400, y: 65, scale: 0.8, rotation: 0 },
  { id: 370, x: 4800, y: 65, scale: 1.2, rotation: 0 },
  { id: 369, x: 4000, y: 65, scale: 1.2, rotation: 0 },
  { id: 368, x: 3200, y: 65, scale: 1.2, rotation: 0 },
  { id: 367, x: 2700, y: 65, scale: 1.2, rotation: 0 },
  { id: 366, x: 1700, y: 65, scale: 1.2, rotation: 0 },
  { id: 365, x: 1000, y: 65, scale: 1.2, rotation: 0 },
]);

onMounted(() => {
  const img = new Image();
  img.src = '/images/lageplan/tree.webp';

  img.onload = () => {
    myImage.value = img;
  };
});
</script>
