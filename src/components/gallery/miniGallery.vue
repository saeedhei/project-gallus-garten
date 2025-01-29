<template>
  <div class="w-full h-auto bg-gray-400 flex flex-wrap md:flex-nowrap items-center justify-evenly p-4 space-y-4 md:space-y-0 md:space-x-8">
    <!-- Image Gallery -->
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center w-full">
      <img src="../../assets/img1.avif" alt="Gallery one" class="w-full md:w-[20vw] object-cover" />
      <img src="../../assets/img1.avif" alt="Gallery two" class="w-full md:w-[20vw] object-cover" />
      <img src="../../assets/img1.avif" alt="Gallery three" class="w-full md:w-[20vw] object-cover" />
    </div>

    <!-- Button -->
    <button
      @click="goToMainGalleryPage"
      class="w-full md:w-[10%] bg-cyan-500 h-[50px] border rounded-lg text-white text-lg hover:bg-cyan-600 transition"
    >
      See more
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMainGalleryPage = () => {
  router.push('/bildergalerie')
}
</script>
