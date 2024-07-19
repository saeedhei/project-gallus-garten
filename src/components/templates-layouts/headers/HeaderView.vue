<script setup lang="ts">
import TopHeaderView from '../../organisms/header-teils/TopHeader.vue'
import AnimeChevron from '../../atoms/icons/AnimeChevron.vue'

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
</script>

<template>
  <div class="min-h-screen flex items-center justify-center" style="background-color: #509e49">
    <header
      class="w-full bg-cover bg-no-repeat bg-fixed bg-center h-96 relative"
      style="background-image: url('/gallus-garten/images/header.jpg')"
    >
      <div class="absolute inset-0 bg-green-700 opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-4">GallusGarten</h1>
          <p class="text-lg text-white">
            Ein Garten für Alle – Urban Gardening im Gallus – Bürgergarten
          </p>
          <TopHeaderView />
        </div>
      </div>
    </header>
  </div>
  <a href="#sectiona" @click="scrollToSection('sectiona')">
    <div class="flex items-center justify-center">
      <AnimeChevron />
    </div>
  </a>
</template>

<style scoped>
.flex.items-center.justify-center {
  overflow: visible;
}
</style>
