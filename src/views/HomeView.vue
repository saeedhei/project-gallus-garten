<script setup lang="ts">
import HeaderView from '../components/templates-layouts/headers/HeaderView.vue'
import ASectionView from '../components/templates-layouts/sections/GallusAHome.vue'
// import ProjectSlider from '../components/organisms/slider-all/ProjectSlider.vue'
import HomeZeitungSection from '../components/templates-layouts/sections/HomeZeitung.vue'
import BSectionView from '../components/templates-layouts/sections/GallusBHome.vue'
import CSectionView from '../components/templates-layouts/sections/GallusCHome.vue'
import CrookedSectionView from '../components/templates-layouts/sections/CrookedSection.vue'
import UnsereSponsoren from '../components/organisms/slider-all/UnsereSponsoren.vue'
// import MainView from '../components/1-home/MainView.vue'
import FooterView from '../components/templates-layouts/footers/FooterView.vue'

import UnderConstructionPopup from '../components/molecules/UnderConstructionPopup.vue'
import { useSeo } from '@/composables/useSeo'
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
useSeo({
  title: 'Ein Garten für alle • GallusGarten',
  description: 'Learn more about our company, values, and mission.',
  ogTitle: 'Ein Garten für alle • GallusGarten',
  ogDescription: 'Discover what makes our company unique.',
  ogImage: `${baseUrl}src/assets/images/GallusGarten.svg`,
  ogUrl: window.location.href
});
</script>

<template>
  <HeaderView />
  <main>
    <UnderConstructionPopup />
    <!-- <ProjectSlider /> -->
    <HomeZeitungSection id="sectiona" />
    <ASectionView />
    <BSectionView />
    <CrookedSectionView class="bg-emerald-200" />
    <CSectionView />
    <UnsereSponsoren />
  </main>
  <FooterView />
</template>

<style scoped></style>
