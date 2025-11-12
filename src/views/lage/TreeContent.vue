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
        v-if="treeImage"
        :config="{
          image: treeImage,
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

    <!-- فقط اگر درخت خفاش دارد -->
    <template v-if="tree.hasBat">
      <v-group
        :config="{
          x: tree.x + 15 + 55,
          y: tree.y + 25 + 30,
        }"
      >
        <!-- پس‌زمینه سفید -->
        <v-rect
          :config="{
            width: 45,
            height: 45,
            fill: 'white',
            cornerRadius: 25,
            opacity: 0.8,
            offsetX: 22.5,
            offsetY: 22.5,
          }"
        />

        <!-- آیکون خفاش -->
        <v-image
          v-if="batImage"
          :config="{
            image: batImage,
            x: 0,
            y: 0,
            width: 35,
            height: 25,
            offsetX: 17.5,
            offsetY: 12.5,
            opacity: 1,
          }"
        />
      </v-group>
    </template>

    <!-- فقط اگر درخت سویفت دارد -->
    <template v-if="tree.hasSwift">
      <v-group
        :config="{
          x: tree.x + 15 + 55,
          y: tree.y + 25 + 0,
        }"
      >
        <!-- پس‌زمینه سفید -->
        <v-rect
          :config="{
            width: 45,
            height: 45,
            fill: 'white',
            cornerRadius: 25,
            opacity: 0.8,
            offsetX: 22.5,
            offsetY: 22.5,
          }"
        />

        <!-- آیکون سویفت -->
        <v-image
          v-if="swiftImage"
          :config="{
            image: swiftImage,
            x: 0,
            y: 0,
            width: 35,
            height: 25,
            offsetX: 17.5,
            offsetY: 12.5,
            opacity: 1,
          }"
        />
      </v-group>
    </template>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const treeImage = ref<HTMLImageElement | null>(null);
const batImage = ref<HTMLImageElement | null>(null);
const swiftImage = ref<HTMLImageElement | null>(null);

const trees = ref([
  { id: 65, x: 11230, y: 950, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 66, x: 10390, y: 950, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 67, x: 9800, y: 850, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 68, x: 9200, y: 850, scale: 0.8, rotation: 0, hasBat: false, hasSwift: false },
  { id: 69, x: 8400, y: 850, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 70, x: 8000, y: 850, scale: 0.8, rotation: 0, hasBat: false, hasSwift: false },
  { id: 71, x: 7500, y: 850, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 72, x: 7000, y: 850, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 73, x: 6300, y: 850, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 74, x: 5700, y: 850, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 75, x: 5000, y: 850, scale: 1.2, rotation: 0, hasBat: false, hasSwift: false },
  { id: 76, x: 4200, y: 850, scale: 0.8, rotation: 0, hasBat: false, hasSwift: false },
  { id: 77, x: 3200, y: 850, scale: 0.8, rotation: 0, hasBat: false, hasSwift: false },
  { id: 78, x: 1980, y: 970, scale: 1.2, rotation: 0, hasBat: false, hasSwift: false },
  { id: 79, x: 990, y: 970, scale: 1.2, rotation: 0, hasBat: false, hasSwift: false },
  //
  { id: 379, x: 10900, y: 65, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 378, x: 10100, y: 65, scale: 0.8, rotation: 0, hasBat: false, hasSwift: false },
  { id: 377, x: 9500, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 376, x: 8800, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 375, x: 8000, y: 65, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 374, x: 7300, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: false },
  { id: 373, x: 6700, y: 65, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 372, x: 6000, y: 65, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 371, x: 5400, y: 65, scale: 0.8, rotation: 0, hasBat: false, hasSwift: false },
  { id: 370, x: 4800, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: false },
  { id: 369, x: 4000, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 368, x: 3200, y: 65, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 367, x: 2700, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: false },
  { id: 366, x: 1700, y: 65, scale: 1.2, rotation: 0, hasBat: true, hasSwift: false },
  { id: 365, x: 1000, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
  { id: 364, x: 300, y: 65, scale: 1.2, rotation: 0, hasBat: false, hasSwift: true },
]);

onMounted(() => {
  // 🌳 بارگذاری تصویر درخت
  const img = new Image();
  img.src = '/images/lageplan/tree.webp';

  img.onload = () => {
    treeImage.value = img;
  };

  // 🦇 بارگذاری آیکون خفاش
  const batImg = new Image();
  batImg.src = '/images/lageplan/bat.svg';
  batImg.onload = () => {
    batImage.value = batImg;
  };

  // لانه سویفت
  const swiftImg = new Image();
  swiftImg.src = '/images/lageplan/Swift.svg';
  swiftImg.onload = () => {
    swiftImage.value = swiftImg;
  };
});
</script>
