<!-- cspell:disable -->
<template>
  <v-group :config="{ x, y, rotation, draggable: true }">
    <!-- دستگیره سمت چپ برای درگ -->
    <v-rect
      :config="{
        x: -20,
        y: 35,
        width: 15,
        height: 30,
        fill: '#ccc',
        stroke: 'black',
        strokeWidth: 1,
        cornerRadius: 3,
      }"
    />

    <!-- خط افقی اصلی -->
    <v-line :config="{ points: [0, 50, 2000, 50], stroke: 'red', strokeWidth: 2 }" />

    <!-- خط صفر -->
    <v-line
      :config="{
        points: [0, 40, 0, 60],
        stroke: 'red',
        strokeWidth: 2,
      }"
    />
    <v-text
      :config="{
        x: 0,
        y: 65,
        text: '0',
        fontSize: 12,
        fill: 'black',
        offsetX: 6, // حدوداً نصف عرض عدد
      }"
    />

    <!-- تیک‌های کوچک هر 20 پیکسل -->
    <v-line
      v-for="i in tickCount"
      :key="'tick-' + i"
      :config="{
        points: [i * tickSpacing, 45, i * tickSpacing, 55],
        stroke: 'red',
        strokeWidth: 1,
      }"
    />

    <!-- تیک‌های بزرگ‌تر هر 100 پیکسل و اعداد -->
    <template v-for="i in majorTickCount" :key="'major-' + i">
      <v-line
        :config="{
          points: [i * majorTickSpacing, 40, i * majorTickSpacing, 60],
          stroke: 'red',
          strokeWidth: 2,
        }"
      />
      <v-text
        :config="{
          x: i * majorTickSpacing,
          y: 65,
          text: String(i * majorTickSpacing),
          fontSize: 12,
          fill: 'black',
          offsetX: String(i * majorTickSpacing).length * 3.5, // متن را وسط قرار می‌دهد
        }"
      />
    </template>
  </v-group>
</template>

<script setup lang="ts">
const tickSpacing = 20;
// const tickCount = 50;
const tickCount = 100; // برای 2000 پیکسل

const majorTickSpacing = 100;
// const majorTickCount = 10;
const majorTickCount = 20; // برای 2000 پیکسل

defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, default: 2000 },
  height: { type: Number, default: 300 },
  rotation: { type: Number, default: 0 },
});
</script>
