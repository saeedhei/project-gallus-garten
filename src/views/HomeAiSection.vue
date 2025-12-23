<template>
  <!-- <section
    ref="sectionRef"
    class="relative overflow-hidden p-8 bg-gradient-to-br from-green-100 via-white to-green-50 shadow-2xl border border-green-200"
  > -->
  <div
    ref="sectionRef"
    v-bind="$attrs"
    class="flex flex-col text-center py-16 px-4 lg:px-16 md:px-8 xl:px-24 xxl:px-40"
  >
    <!-- نور درخشان هوش مصنوعی -->
    <div
      class="absolute inset-0 bg-gradient-to-tr from-emerald-200/30 to-transparent blur-3xl opacity-70 animate-pulse"
    ></div>

    <!-- عنوان -->
    <div class="relative flex items-center gap-2 mb-4">
      <Sparkles class="text-emerald-600 w-6 h-6 animate-spin-slow" />
      <h2
        class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-800 drop-shadow-sm"
      >
        Tägliche KI-Nachricht 🌱
      </h2>
    </div>

    <!-- وضعیت در حال فکر کردن -->
    <div v-if="loading" class="text-gray-500 italic">
      <span>{{ thinkingText }}</span>
    </div>

    <!-- نمایش پیام -->
    <div v-else class="relative z-10 space-y-3">
      <p class="text-lg font-semibold text-emerald-700 flex items-center gap-1">
        🌳 <span>{{ aiData.plant }}</span>
      </p>

      <p class="text-gray-800 text-base leading-relaxed whitespace-pre-line min-h-[4rem] text-left">
        <span v-for="(char, i) in displayedMessage" :key="i">{{ char }}</span>
      </p>

      <p class="text-sm text-gray-500 mt-3">📅 {{ aiData.date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { Sparkles } from 'lucide-vue-next';

interface AiData {
  plant: string;
  message: string;
  date: string;
}

const aiData = ref<AiData>({ plant: '', message: '', date: '' });
const loading = ref(true);
const displayedMessage = ref('');
const thinkingText = ref('🤖 Die KI denkt nach');
const sectionRef = ref<HTMLElement | null>(null);
let dots = 0;
let observer: IntersectionObserver | null = null;
let isTypingStarted = false;

// انیمیشن تایپ کردن پیام
const typeMessage = async (text: string) => {
  displayedMessage.value = '';
  for (let i = 0; i < text.length; i++) {
    displayedMessage.value += text[i];
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
};

// انیمیشن نقطه‌ها برای حالت “در حال فکر کردن”
const startThinkingAnimation = () => {
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    thinkingText.value = '🤖 Die KI denkt nach' + '.'.repeat(dots);
  }, 500);
  return interval;
};

const fetchAIData = async () => {
  const cached = localStorage.getItem('daily-ai');
  if (cached) aiData.value = JSON.parse(cached);

  const interval = startThinkingAnimation();
  try {
    const res = await axios.get(`${import.meta.env.VITE_endPoint}/v3/ai/latest`);
    aiData.value = res.data;
    localStorage.setItem('daily-ai', JSON.stringify(res.data));
  } catch (err) {
    console.warn('⚠️ Fehler beim Laden der KI-Nachricht:', err);
    aiData.value = {
      // plant: '❌ Fehler',
      // message: 'Die heutige Nachricht konnte nicht geladen werden.',
      plant: 'Bambus',
      message:
        'Bambus ist eine schnell wachsende und vielseitige Pflanze, die in vielen Teilen der Welt verbreitet ist. Er steht für Stärke, Flexibilität und Nachhaltigkeit, da er ohne großen Pflegeaufwand wächst und vielseitig genutzt werden kann. Bambus wird sowohl als Zierpflanze in Gärten als auch als natürlicher Sichtschutz verwendet und spielt zudem eine wichtige Rolle als umweltfreundlicher Rohstoff. Durch seine dichten Halme und immergrünen Blätter trägt Bambus zu einem angenehmen Mikroklima bei und verleiht Außenräumen eine ruhige, natürliche Atmosphäre.',
      date: new Date().toLocaleDateString('de-DE'),
    };
  } finally {
    clearInterval(interval);
    loading.value = false;
  }
};

const startTypingWhenVisible = () => {
  if (!sectionRef.value) return;
  observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isTypingStarted && !loading.value) {
        isTypingStarted = true;
        await typeMessage(aiData.value.message);
      }
    },
    { threshold: 0.4 }, // وقتی ۴۰٪ سکشن دیده شد
  );
  observer.observe(sectionRef.value);
};

onMounted(async () => {
  await fetchAIData();
  startTypingWhenVisible();
});

onUnmounted(() => {
  if (observer && sectionRef.value) observer.unobserve(sectionRef.value);
});
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>
