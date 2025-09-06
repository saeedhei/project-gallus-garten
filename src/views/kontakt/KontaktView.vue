<!-- src\views\kontakt\KontaktView.vue -->
<template>
  <section class="contact-page px-4 py-8 max-w-6xl mx-auto">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1
        class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent"
      >
        Kontakt
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Treten Sie mit uns in Verbindung – wir freuen uns auf Ihre Nachricht!
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Contact Form -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Senden Sie uns eine Nachricht</h2>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="name">Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              required
              class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Ihr Name"
            />
          </div>
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="email">E-Mail</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="ihre@email.de"
            />
          </div>
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="message">Nachricht</label>
            <textarea
              v-model="form.message"
              id="message"
              rows="5"
              required
              class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Ihre Nachricht an uns..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-green-600 to-teal-500 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-300 hover:from-green-700 hover:to-teal-600 hover:shadow-lg transform hover:-translate-y-0.5"
            :disabled="isLoading || isSent"
          >
            <span
              v-if="isLoading"
              class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"
            ></span>
            <span v-else-if="isSent">✅ Nachricht gesendet</span>
            <span v-else>Nachricht senden</span>
          </button>
        </form>
      </div>

      <!-- Map and Contact Info -->
      <div class="space-y-8">
        <!-- Map Block -->
        <div class="rounded-2xl overflow-hidden shadow-lg h-96">
          <div id="map" class="h-full w-full"></div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">Kontaktinformationen</h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="bg-green-100 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-800">Adresse</h3>
                <p class="text-gray-600">
                  GallusGarten II - Gemeinschaftsgarten an der Galluswarte gem. e.V.
                </p>
                <p class="text-gray-600">c/o Ralf Harth</p>
                <p class="text-gray-600">Pariser Straße 42, 60486 Frankfurt/Main</p>
              </div>
            </div>

            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-800">E-Mail</h3>
                <a
                  href="mailto:GallusGarten-Galluswarte@web.de"
                  class="text-green-600 hover:underline"
                  >GallusGarten-Galluswarte@web.de</a
                >
              </div>
            </div>

            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-800">Telefon</h3>
                <a href="tel:01607639909" class="text-gray-600 hover:text-green-600"
                  >0160 763 99 09</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import L from 'leaflet';

// Import Leaflet CSS (important!)
import 'leaflet/dist/leaflet.css';

// Import marker images so Vite bundles them
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Explicitly create a new default icon
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Override the default for all markers
L.Marker.prototype.options.icon = DefaultIcon;

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

.contact-page {
  background: linear-gradient(to bottom, #f8fafc, #f0fdf4);
  min-height: calc(100vh - 80px);
}
</style>
