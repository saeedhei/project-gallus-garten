<script setup lang="ts">
<<<<<<< HEAD
import HeaderView from '../components/templates-layouts/headers/HeaderView.vue'
import ASectionView from '../components/templates-layouts/sections/GallusAHome.vue'
import ProjectSlider from '../components/organisms/slider-all/ProjectSlider.vue'
import BSectionView from '../components/templates-layouts/sections/GallusBHome.vue'
import CSectionView from '../components/templates-layouts/sections/GallusCHome.vue'
import CrookedSectionView from '../components/templates-layouts/sections/CrookedSection.vue'
// import MainView from '../components/1-home/MainView.vue'
import FooterView from '../components/templates-layouts/footers/FooterView.vue'
=======
import HeaderView from '../components/1-home/HeaderView.vue'
// import MainView from '../components/1-home/MainView.vue'
import FooterView from '../components/1-home/FooterView.vue'
import { ref } from 'vue'

const label = ref('Click me')
const handleClick = () => {
  alert('Button clicked!')
}
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
</script>

<template>
  <HeaderView />
  <main>
<<<<<<< HEAD
   
    <ASectionView id="sectiona" />
    <ProjectSlider />
    <BSectionView />
    <CrookedSectionView class="bg-emerald-200" />
    <CSectionView />
=======
    <!-- <MainView /> -->
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> -->
    <!-- Your three columns go here -->
    <!-- <div class="bg-gray-200 p-4">Column 1</div> -->
    <!-- <div class="bg-gray-200 p-4">Column 2</div> -->
    <!-- <div class="bg-gray-200 p-4">Column 3</div> -->
    <!-- </div> -->

    <!-- <button class="btn" @click="handleClick">
    {{ label }}
  </button> -->
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
  </main>
  <FooterView />
</template>

<<<<<<< HEAD
<style scoped></style>
=======
<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300;
}
</style>
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
