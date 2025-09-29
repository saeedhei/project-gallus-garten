<template>
  <div :style="{ background: currentBg }" class="transition-colors duration-300">
    <!-- Future 2026 -->
    <section
      ref="futureRef"
      class="min-h-screen flex flex-col items-center justify-center text-white p-8"
    >
      <h2 class="text-4xl font-extrabold mb-6">2026 · Zukunft</h2>
      <p class="mb-4 text-gray-200 text-center max-w-xl">Ein Blick in die Zukunft des Gartens.</p>
      <RouterLink to="#">
        <button
          class="px-6 py-3 bg-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-pink-600 transition"
        >
          Zur Karte 2026
        </button>
      </RouterLink>
    </section>

    <!-- Current 2025 -->
    <section
      ref="currentRef"
      class="min-h-screen flex flex-col items-center justify-center text-black p-8"
    >
      <h2 class="text-4xl font-bold mb-6">2025 · Aktuell</h2>
      <p class="mb-4 text-gray-700 text-center max-w-xl">
        Die aktuelle Gartenkarte für das Jahr 2025.
      </p>
      <RouterLink to="/lageplan-aktuell">
        <button
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-2xl shadow hover:bg-green-700 transition"
        >
          Zur Karte 2025
        </button>
      </RouterLink>
    </section>

    <!-- Old Maps -->
    <section ref="pastRef" class="min-h-screen text-gray-800 p-8 flex flex-col">
      <h2 class="text-3xl font-serif mb-6">Vorherige Jahre</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="map in oldMaps"
          :key="map.id"
          class="bg-white/80 shadow rounded-lg p-4 flex flex-col items-center"
        >
          <img :src="map.image" :alt="map.name" class="rounded shadow grayscale opacity-90 mb-3" />
          <p class="text-lg font-semibold">{{ map.name }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const futureRef = ref<HTMLElement | null>(null);
const currentRef = ref<HTMLElement | null>(null);
const pastRef = ref<HTMLElement | null>(null);
const currentBg = ref('linear-gradient(to right, 49,46,129, 109,40,217, 190,24,93)'); // پیشفرض gradient آینده

// RGB سه رنگ برای gradient آینده
const colors = {
  futureStart: [49, 46, 129], // Indigo
  futureMid: [109, 40, 217], // Purple
  futureEnd: [190, 24, 93], // Pink
  current: [240, 253, 244], // سبز روشن
  past: [245, 240, 230], // Beige
};

// تابع blend تدریجی دو رنگ
function lerpColor(a: number[], b: number[], t: number) {
  t = Math.min(Math.max(t, 0), 1); // clamp
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// تابع blend برای gradient آینده
function lerpFuture(t: number) {
  t = Math.min(Math.max(t, 0), 1);
  const start = lerpColor(colors.futureStart, colors.futureMid, t);
  const end = lerpColor(colors.futureMid, colors.futureEnd, t);
  return `linear-gradient(to right, rgb(${start[0]},${start[1]},${start[2]}), rgb(${end[0]},${end[1]},${end[2]}))`;
}

const updateBg = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  const futureTop = futureRef.value?.offsetTop ?? 0;
  const currentTop = currentRef.value?.offsetTop ?? 0;
  const pastTop = pastRef.value?.offsetTop ?? 0;

  if (scrollY < currentTop - windowHeight / 2) {
    const t = (scrollY - futureTop) / (currentTop - futureTop);
    currentBg.value = lerpFuture(t);
  } else if (scrollY < pastTop - windowHeight / 2) {
    const t = (scrollY - currentTop) / (pastTop - currentTop);
    const c = lerpColor(colors.current, colors.past, t);
    currentBg.value = `rgb(${c[0]},${c[1]},${c[2]})`;
  } else {
    const p = colors.past;
    currentBg.value = `rgb(${p[0]},${p[1]},${p[2]})`;
  }
};

onMounted(() => {
  updateBg();
  window.addEventListener('scroll', updateBg);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateBg);
});

// لیست oldMaps
const oldMaps = [
  {
    id: 1,
    name: 'Modell Frankenallee 60-78 - 2024',
    image: '/images/lageplan/GaGa Modell Frankenallee_60-78.jpeg',
  },
  {
    id: 2,
    name: 'GaGa2 Lageplan details FA60-78 - 2024',
    image: '/images/lageplan/GaGa2 Lageplan details FA60-78 2024-03-01 .png',
  },
  {
    id: 3,
    name: 'Stadtplan Frankenallee - 2023',
    image: '/images/lageplan/GaGa  Stadtplan Frankenallee.png',
  },
  {
    id: 4,
    name: 'GallusGarten2 Lageplan A - 2021',
    image: '/images/lageplan/GallusGarten2 Lageplan A (2021).jpg',
  },
  {
    id: 5,
    name: 'ASE GaGa2 Umfeld Frankenallee - 2019',
    image: '/images/lageplan/ASE GaGa2 Umfeld Frankenallee .jpeg',
  },
  {
    id: 6,
    name: 'Lageplan Veranstaltung - 2019',
    image: '/images/lageplan/Lageplan Veranstaltung.jpeg',
  },
];
</script>
