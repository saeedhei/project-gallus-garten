<template>
  <section class="bg-gray-100">
    <div class="flex justify-center items-center">
      <h2
        class="green py-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl font-heading text-center"
      >
        Was ist neu auf der Homepage?
      </h2>
    </div>

    <div class="relative">
      <!-- Left navigation button -->
      <div class="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <button ref="prevEl" class="swiper-button-prev text-white rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Right navigation button -->
      <div class="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <button ref="nextEl" class="swiper-button-next text-white rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <Swiper
        :modules="[Navigation]"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        :spaceBetween="30"
        :slidesPerView="1"
        :breakpoints="{
          640: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }"
        :loop="false"
        class="swiper-container"
      >
        <SwiperSlide v-for="(post, index) in posts" :key="index" class="swiper-slide">
          <div class="post bg-white rounded-lg shadow-lg p-6">
            <h2 class="green text-2xl font-semibold mb-4">{{ post.title }}</h2>
            <p class="text-gray-700">{{ post.content }}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide class="swiper-slide">
          <div class="post bg-white rounded-lg shadow-lg p-6">
            <h2 class="green text-2xl font-semibold mb-4">Mehr sehen</h2>
            <!-- Clickable Icon with router-link -->
            <router-link to="/docs/changelog" class="flex items-center space-x-2 hover:text-green-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>Click Me</span>
            </router-link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const posts = ref([
{ title: 'Changelog', content: 'Die Seite wurde erstellt' },
  { title: 'Impressum', content: 'Die Seite wurde erstellt' },
  { title: 'Datenschutz', content: 'Die Seite wurde erstellt' },
  { title: 'Legal', content: 'Die Seite wurde erstellt' }
])
</script>

<style>
.swiper-container {
  width: 100%;
  padding: 20px 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
