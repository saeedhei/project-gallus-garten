<!-- src\views\kontakt\KontaktView.vue -->
<template>
  <section class="contact-page p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Kontakt</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Kontaktformular -->
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium" for="name">Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            required
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label class="block mb-1 font-medium" for="email">E-Mail</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label class="block mb-1 font-medium" for="message">Nachricht</label>
          <textarea
            v-model="form.message"
            id="message"
            rows="5"
            required
            class="w-full border rounded p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center"
          :disabled="isLoading || isSent"
        >
          <span
            v-if="isLoading"
            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
          ></span>
          <span v-else-if="isSent">✅ Gesendet</span>
          <span v-else>Nachricht senden</span>
        </button>
      </form>

      <!-- Map Block -->
      <div id="map" class="h-96 w-full rounded shadow"></div>
    </div>

    <div class="mt-8 text-sm text-gray-700">
      <h2 class="font-semibold mb-2">Adresse</h2>
      <p>GallusGarten II - Gemeinschaftsgarten an der Galluswarte gem. e.V.</p>
      <p>c/o Ralf Harth</p>
      <p>Pariser Straße 42, 60486 Frankfurt/Main</p>
      <p>
        Email:
        <a href="mailto:GallusGarten-Galluswarte@web.de" class="text-blue-600 underline"
          >GallusGarten-Galluswarte@web.de</a
        >
      </p>
      <p>Telefon: 0160 763 99 09</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import L from 'leaflet';

// Formular-Daten
const form = reactive({
  name: '',
  email: '',
  message: '',
});

// Loading state
const isLoading = ref(false);
const isSent = ref(false);

const submitForm = async () => {
  isLoading.value = true; // شروع لودینگ
  try {
    await fetch(`${import.meta.env.VITE_endPoint}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    isSent.value = true;
    form.name = '';
    form.email = '';
    form.message = '';

    setTimeout(() => {
      isSent.value = false; // بعد از چند ثانیه دکمه به حالت اولیه برمی‌گردد
    }, 3000);
  } catch (err) {
    console.error('Fehler beim Senden:', err);
  } finally {
    isLoading.value = false; // پایان لودینگ
  }
};

onMounted(() => {
  const map = L.map('map').setView([50.1050969, 8.6451529], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([50.1050969, 8.6451529])
    .addTo(map)
    .bindPopup('GallusGarten II - Gemeinschaftsgarten')
    .openPopup();
});
</script>

<style scoped>
#map {
  height: 100%;
  min-height: 300px;
}
</style>
