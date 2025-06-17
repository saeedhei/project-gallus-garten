<script setup lang="ts">
import ASectionView from '../components/templates-layouts/sections/GallusAHome.vue'
// import ProjectSlider from '../components/organisms/slider-all/ProjectSlider.vue'
import HomeZeitungSection from '../components/templates-layouts/sections/HomeZeitung.vue'
import BSectionView from '../components/templates-layouts/sections/GallusBHome.vue'
import CSectionView from '../components/templates-layouts/sections/GallusCHome.vue'
import CrookedSectionView from '../components/templates-layouts/sections/CrookedSection.vue'
import UnsereSponsoren from '../components/organisms/slider-all/UnsereSponsoren.vue'
// import MainView from '../components/1-home/MainView.vue'
// import UnderConstructionPopup from '../components/molecules/UnderConstructionPopup.vue'

import { useHead } from '@unhead/vue'
// import { useSeo } from '@/composables/useSeo'
const baseUrl = import.meta.env.VITE_APP_BASE_URL

if (!baseUrl) {
  throw new Error(
    "The required environment variable 'VITE_APP_BASE_URL' is missing. Please check your .env file.",
  )
}

useHead({
  title: 'Wo Generationen sich treffen - Galluswarte • GallusGarten',
  meta: [
    {
      name: 'description',
      content:
        'Ein Garten für alle an der Galluswarte, Frankfurt: interkulturell, familienfreundlich & bildungsorientiert. Gemeinsam pflanzen, lernen & wachsen.',
    },

    // OpenGraph (Facebook/LinkedIn)
    { property: 'og:title', content: 'Ein Garten für alle • GallusGarten' },
    { property: 'og:description', content: 'Discover what makes our company unique.' },
    { property: 'og:image', content: `${baseUrl}src/assets/images/GallusGarten.svg` },
    { property: 'og:url', content: window.location.href },
    { property: 'og:type', content: 'website' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Ein Garten für alle • GallusGarten' },
    { name: 'twitter:description', content: 'Discover what makes our company unique.' },
    { name: 'twitter:image', content: `${baseUrl}src/assets/images/GallusGarten.svg` },

    // Robots
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>

<template>
  <!-- <UnderConstructionPopup /> -->
  <!-- <ProjectSlider /> -->
  <HomeZeitungSection id="section-a" />
  <ASectionView />
  <BSectionView />
  <CrookedSectionView class="bg-emerald-200" />
  <CSectionView />
  <UnsereSponsoren />
</template>

<style scoped></style>
