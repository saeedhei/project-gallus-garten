<template>
  <div class="bg-gradient-to-b from-white to-[#F3F4F6] min-h-screen py-16 px-4">
    <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Unser Team</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      <div
        v-for="card in cards"
        :key="card.id"
        class="bg-white rounded-2xl shadow-md p-6 pt-10 relative group transition hover:shadow-xl"
      >
        <!-- Profile Image -->
        <div
          class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#65A30D] shadow"
        >
          <img :src="card.img" :alt="card.name" class="w-full h-full object-contain bg-gray-100" />
        </div>

        <!-- Name + Title -->
        <h2 class="text-xl font-semibold text-center text-gray-800 mb-1">{{ card.name }}</h2>
        <p class="text-sm text-center text-[#65A30D] font-medium mb-4">{{ card.title }}</p>

        <!-- Description -->
        <p class="text-gray-600 text-sm text-center mb-4 px-2 leading-relaxed">
          {{ card.description }}
        </p>

        <!-- Contact Info -->
        <div class="text-sm text-gray-700 flex flex-col gap-2 items-center mb-4">
          <div v-if="card.email" class="flex items-center gap-2">
            <i class="fas fa-envelope text-[#65A30D]"></i> {{ card.email }}
          </div>
          <div v-if="card.phone" class="flex items-center gap-2">
            <i class="fas fa-phone text-[#65A30D]"></i> {{ card.phone }}
          </div>
        </div>

        <!-- Action Button -->
        <button
          class="bg-[#65A30D] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-[#4a7908] transition mb-4"
        >
          Profil ansehen
        </button>

        <!-- Start Date Box -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-gray-600 text-white text-xs text-center py-2 rounded-b-2xl"
        >
          Startdatum: {{ card.startDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const cards = reactive([
  {
    id: 1,
    name: 'Ralf Harth',
    title: 'Gründer / Vorstand',
    description: 'Erfahrener Unternehmer mit Leidenschaft für Innovation.',
    email: 'ralf@example.com',
    phone: '123-456-7890',
    startDate: '01 Jan 2022',
    img: new URL('@/assets/img1.avif', import.meta.url).href,
  },
  {
    id: 2,
    img: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Shekiba Rahim',
    title: 'Vorstand',
    description: 'Expertin in sozialen Projekten und Teamführung.',
    email: 'lucy@example.com',
    phone: '111-111-1111',
    startDate: '25 Dec 2019',
  },
  {
    id: 3,
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Doris Diehl',
    title: 'Vorstand',
    description: 'Bringt langjährige Erfahrung in Management und Organisation mit.',
    email: 'sam@example.com',
    phone: '555-555-5555',
    startDate: '10 Mar 2020',
  },
  {
    id: 4,
    img: '/images/team/saeed-heidarizarei.webp',
    name: 'Saeed Heidariazarei',
    title: 'Vorstand / CTO',
    description: 'Fullstack Entwickler & Technologievisionär.',
    email: 'saeedhei@gmail.com',
    phone: '017631105967',
    startDate: '15 Feb 2021',
  },
])
</script>
