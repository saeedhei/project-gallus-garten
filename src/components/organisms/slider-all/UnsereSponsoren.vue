<template>
  <section class="bg-green-700">
    <div class="flex justify-center items-center">
      <h2
        class="text-gray-50 py-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl font-heading text-center"
      >
        Unsere Sponsoren
      </h2>
    </div>

    <div class="relative">
      <Swiper
        :modules="[Autoplay, Keyboard, Zoom, FreeMode]"
        :spaceBetween="30"
        :slidesPerView="3"
        :speed="7000"
        :grabCursor="true"
        :direction="'horizontal'"
        :zoom="true"
        :keyboard="{ enabled: true, onlyInViewport: false }"
        :autoplay="{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }"
        :loop="true"
        :freeMode="true"
        :breakpoints="{
          640: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 4
          }
        }"
        class="swiper-container"
      >
        <SwiperSlide v-for="(logo, index) in logos" :key="index" class="swiper-slide">
          <div class="logo bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
            <img :src="logo.src" :alt="logo.alt" class="max-h-20" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Keyboard, Zoom, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css/zoom'
import 'swiper/css/free-mode'

// Define the type for the logo object
interface Logo {
  src: string
  alt: string
}

// Define a reactive array of logos
const logos = ref<Logo[]>([
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Deutsche_Bank-Logo.svg/1280px-Deutsche_Bank-Logo.svg.png', alt: 'Deutsche Bank AG' },
  { src: 'https://www.amka.de/profiles/amka_microsite/themes/custom/amka_theme/images/amka.png', alt: 'AMKA' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Hda_logo.svg/1200px-Hda_logo.svg.png', alt: 'Hochschule Darmstadt' },
  { src: 'https://frankfurt.de/-/media/frankfurtde/global/image/seitenrahmen/footerlogo.ashx?la=de-de6b171b43a6e644fb88df64df25328a18&mw=1280&hash=3C8D80D1E72F6317B5444810BE0CF329', alt: 'Stadt Frankfurt' },
  { src: '/src/assets/images/seointro-knowledge_graph_logo.png', alt: 'SEOintro' }
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

.logo {
  height: 90px; /* Adjust the height as needed */
}

.logo img {
  object-fit: cover;
  width: 100%;
}

</style>
