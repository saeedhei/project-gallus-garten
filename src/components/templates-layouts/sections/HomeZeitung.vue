<template>
  <section class="px-2 py-10 bg-white md:px-0">
    <div class="container items-center max-w-6xl px-8 mx-auto xl:px-20">
      <div class="flex flex-wrap items-center sm:-mx-3">
        <div class="w-full md:w-1/2 md:px-3">
          <div
            class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
          >
            <h1
              class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl"
            >
              <span class="block lg:inline leading-relaxed">Neujahrsgruß / </span>
              <span class="block text-lime-600 lg:inline leading-relaxed">Tätigkeitsbericht</span>
            </h1>
            <div class="h-auto overflow-hidden rounded-md sm:rounded-xl flex justify-begin">
              <img src="/docs/zeitung.jpg" class="object-cover w-1/2" />
            </div>
            <!-- <p class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
              Der GallusGarten-Galluswarte wünscht unseren Stadtgärtnerinnen, Nachbarinnen,
              Förderinnen und Unterstützerinnen alles Gute, viel Glück und Gesundheit in ...
            </p> -->
            <div class="w-full md:w-1/2 flex justify-center">
              <a
                href="/docs/zeitung.webp"
                class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-lime-600 rounded-md sm:mb-0 hover:bg-lime-700 sm:w-auto"
              >
                Herunterladen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 flex justify-center">
          <BarChart />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BarChart from '../../organisms/chart-teils/BarChart.vue'
</script>
