<script setup lang="ts">
import TopHeaderView from '../header/TopHeader.vue'
import AnimeChevron from '../atoms/icons/AnimeChevron.vue'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const targetOffset = element.getBoundingClientRect().top + window.pageYOffset
    const currentPosition = window.pageYOffset
    const distance = targetOffset - currentPosition
    const duration = 1000 // Adjust duration as needed, in milliseconds
    const increments = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increments
      const newPosition = easeInOutQuad(currentTime, currentPosition, distance, duration)
      window.scrollTo(0, newPosition)
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    animateScroll()
  }
}

const sentences: string[] = [
  'Wo Generationen gemeinsam gärtnern und gestalten.',
  'Hier wächst nicht nur Gemüse – sondern Gemeinschaft.',
  'Gemeinsam säen, pflegen, ernten.',
  'Wo Natur, Nachbarn und Ideen gedeihen.',
]
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
    style="background-color: #509e49; background-image: url('/gallus-garten/images/header.png')"
  >
    <header class="w-full bg-cover bg-no-repeat bg-fixed bg-center h-96 relative">
      <!-- <div class="absolute inset-0 bg-green-700 opacity-50"></div> -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center h-32">
          <h1 class="text-5xl font-extrabold text-white drop-shadow-lg mb-2 tracking-wide">
            Gallus<span class="text-lime-300">Garten</span>
          </h1>
          <h2 class="text-xl text-gray-100 italic drop-shadow-sm mb-4">
            Im Herzen von Galluswarte
          </h2>
          <TypingEffect class="text-2xl text-white" :sentences="sentences"></TypingEffect>
          <TopHeaderView />
        </div>
      </div>
    </header>
  </div>
  <a href="#section-a" @click="scrollToSection('section-a')">
    <div class="flex items-center justify-center">
      <AnimeChevron />
    </div>
  </a>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
.flex.items-center.justify-center {
  overflow: visible;
}
h1,
h2 {
  font-family: 'Inter', sans-serif;
}
</style>
