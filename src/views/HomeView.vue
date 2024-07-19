<script setup lang="ts">
import HeaderView from '../components/templates-layouts/headers/HeaderView.vue'
import ASectionView from '../components/templates-layouts/sections/GallusAHome.vue'
import ProjectSlider from '../components/organisms/slider-all/ProjectSlider.vue'
import BSectionView from '../components/templates-layouts/sections/GallusBHome.vue'
import CSectionView from '../components/templates-layouts/sections/GallusCHome.vue'
import CrookedSectionView from '../components/templates-layouts/sections/CrookedSection.vue'
// import MainView from '../components/1-home/MainView.vue'
import FooterView from '../components/templates-layouts/footers/FooterView.vue'

import UnderConstructionPopup from '../components/molecules/UnderConstructionPopup.vue';
</script>

<template>
  <HeaderView />
  <main>
    <UnderConstructionPopup />
    <ASectionView id="sectiona" />
    <!-- <ProjectSlider /> -->
    <BSectionView />
    <CrookedSectionView class="bg-emerald-200" />
    <CSectionView />
  </main>
  <FooterView />
</template>

<style scoped></style>
