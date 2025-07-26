<template>
  <v-group>
    <!-- بدنه شِرانک -->
    <v-rect
      :config="{
        x: 1873,
        y: 919,
        width: 138,
        height: 130,
        fill: '#8B4513',
        stroke: 'black',
        strokeWidth: 2,
        draggable: false,
      }"
    />

    <!-- درب چپ -->
    <v-rect
      :config="{
        x: 1873,
        y: 919,
        width: 68, // نصف عرض کمد (138 / 2 تقریباً)
        height: 20,
        fill: '#A0522D', // رنگ کمی متفاوت برای تمایز درب
        stroke: 'black',
        strokeWidth: 1,
      }"
    />

    <!-- درب راست -->
    <v-rect
      :config="{
        x: 1873 + 70,
        y: 919,
        width: 68,
        height: 20,
        fill: '#A0522D',
        stroke: 'black',
        strokeWidth: 1,
      }"
    />

    <!-- متن -->
    <v-text
      :config="{
        text: 'Schrank',
        x: 1873 + 45,
        y: 919 + 60,
        fontSize: 14,
        fill: 'white',
      }"
    />
  </v-group>

  <!-- Gartenhütte -->
  <v-group
    :config="{
      x: 417,
      y: 119,
    }"
  >
    <!-- بدنه آلونک -->
    <v-rect
      :config="{
        x: 1600,
        y: 800,
        width: 240,
        height: 130,
        fill: '#7B6848', // رنگ چوبی برای آلونک
        stroke: 'black',
        strokeWidth: 2,
        draggable: false,
      }"
    />

    <!-- سقف مثلثی -->
    <v-line
      :config="{
        points: [1600, 800, 1720, 750, 1840, 800], // مختصات مثلث سقف
        fill: '#5C4B3B',
        closed: true,
        stroke: 'black',
        strokeWidth: 2,
      }"
    />

    <!-- متن -->
    <v-text
      :config="{
        text: 'Gartenhütte',
        x: 1600 + 75,
        y: 800 + 60,
        fontSize: 16,
        fill: 'white',
      }"
    />
  </v-group>
</template>
