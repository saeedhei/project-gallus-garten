<template>
  <section class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
    <div
      v-if="user"
      class="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-green-200"
    >
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row items-center gap-6 p-8 bg-green-100 border-b border-green-200"
      >
        <img
          :src="user.avatar"
          alt="Benutzeravatar"
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer hover:scale-105 transition"
          @click="openImage(user.avatar)"
        />
        <div class="text-center md:text-left">
          <h1
            class="text-3xl font-extrabold text-green-800 flex items-center gap-2 justify-center md:justify-start"
          >
            {{ user.name }}
            <span class="text-3xl">{{ user.flag }}</span>
          </h1>
          <p class="text-gray-600 mt-1">📍 Frankfurt am Main, Deutschland</p>
          <p class="text-gray-600">📧 {{ user.email }}</p>
        </div>
      </div>

      <!-- Bio -->
      <div class="p-8">
        <h2 class="text-xl font-semibold text-green-700 mb-3">🌿 Persönliche Worte</h2>
        <p class="text-gray-700 leading-relaxed italic border-l-4 border-green-300 pl-4">
          “{{ user.bio }}”
        </p>
      </div>

      <!-- Interessen -->
      <div class="p-8 border-t border-green-100">
        <h2 class="text-xl font-semibold text-green-700 mb-4">🧑‍🌾 Interessen im Garten</h2>
        <ul class="flex flex-wrap gap-3">
          <li
            v-for="interest in user.interests"
            :key="interest"
            class="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm shadow-sm"
          >
            {{ interest }}
          </li>
        </ul>
      </div>

      <!-- Mini Galerie (horizontal scroll) -->
      <div v-if="user.gallery?.length" class="p-8 pt-4 border-t border-green-100">
        <h2 class="text-xl font-semibold text-green-700 mb-4">📸 Fotos</h2>
        <div class="overflow-x-auto">
          <div class="flex gap-4">
            <img
              v-for="(img, index) in user.gallery"
              :key="index"
              :src="img"
              alt="Gartenfoto"
              class="w-48 h-32 object-cover rounded-xl shadow cursor-pointer hover:scale-105 transition flex-shrink-0"
              @click="openImage(img)"
            />
          </div>
        </div>
      </div>

      <!-- Weitere Informationen -->
      <div class="p-8 border-t border-green-100 bg-gray-50">
        <h2 class="text-xl font-semibold text-green-700 mb-4">📋 Weitere Informationen</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div><span class="font-semibold">Sprache:</span> {{ user.language }}</div>
          <div><span class="font-semibold">Alter:</span> {{ user.age }}</div>
          <div><span class="font-semibold">Gartentyp:</span> {{ user.gardenType }}</div>
          <div><span class="font-semibold">Telefon:</span> 0176 ********</div>
        </div>
      </div>
    </div>

    <!-- Modal für Großansicht -->
    <div
      v-if="open && selectedImage"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl overflow-hidden p-4 max-w-2xl w-full shadow-xl">
        <img :src="selectedImage" alt="Großansicht" class="w-full h-auto rounded-md" />
        <button
          class="mt-4 w-full text-center text-green-700 hover:underline text-sm"
          @click="closeModal"
        >
          Schließen
        </button>
      </div>
    </div>

    <div v-else-if="!user" class="text-center text-gray-600 mt-20">
      <p>Benutzer nicht gefunden.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

interface User {
  id: number;
  name: string;
  slug: string;
  email: string;
  avatar: string;
  flag: string;
  bio: string;
  interests: string[];
  age: number;
  language: string;
  gardenType: string;
  gallery?: string[];
}

const users: User[] = [
  {
    id: 1,
    name: 'Saeed Heidarizarei',
    slug: 'saeed-heidarizarei',
    email: 'saeed@example.com',
    avatar: '/images/team/saeed-heidarizarei/saeed-heidarizarei2.webp',
    flag: '🇮🇷',
    bio: 'Ich liebe die Natur und träume von einem ruhigen Platz zwischen Obstbäumen und Kräutern.',
    interests: ['Obstbäume', 'Permakultur', 'Kräutergarten'],
    age: 35,
    language: 'Deutsch, Persisch',
    gardenType: 'Obstgarten',
    gallery: [
      '/images/team/saeed-heidarizarei/saeed-heidarizarei2.webp',
      '/images/team/saeed-heidarizarei/saeed-heidarizarei3.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
    ],
  },
  {
    id: 2,
    name: 'Hannah Frank',
    slug: 'hannah-frank',
    email: 'hannah@******.com',
    avatar: '/images/team/hannah-elise-frank/hannah-elise-frank.webp',
    flag: '🇩🇪 🇮🇪',
    bio: 'Urban Gardening ist mein Rückzugsort. Ich liebe das Pflanzen von Blumen und Gemüse.',
    interests: ['Gemüsebeet', 'Blumen', 'Kompostierung'],
    age: 26,
    language: 'Deutsch, Englisch',
    gardenType: 'Gemüsegarten',
    gallery: [
      '/images/team/hannah-elise-frank/hannah-elise-frank.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
    ],
  },
  {
    id: 3,
    name: 'Ralf Harth',
    slug: 'ralf-harth',
    email: 'ralf@example.com',
    avatar: '/images/team/ralf-harth/ralf-harth.webp',
    flag: '🇩🇪',
    bio: 'Urban Gardening ist mein Rückzugsort. Ich liebe das Pflanzen von Blumen und Gemüse.',
    interests: ['Gemüsebeet', 'Blumen', 'Kompostierung'],
    age: 65,
    language: 'Deutsch, Englisch',
    gardenType: 'Gemüsegarten',
    gallery: [
      '/images/team/ralf-harth/ralf-harth1.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
      '/images/placeholder-image.webp',
    ],
  },
];

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const user = computed(() => users.find((u) => u.slug === slug.value));

const open = ref(false);
const selectedImage = ref<string | null>(null);

function openImage(img: string) {
  selectedImage.value = img;
  open.value = true;
}

function closeModal() {
  open.value = false;
  selectedImage.value = null;
}
</script>
