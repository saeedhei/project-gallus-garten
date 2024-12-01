<template>
  <div>
    <GalleryHeader />
    <GallerymainLayout />
    <FooterView />
  </div>
</template>

<script setup lang="ts">
import GallerymainLayout from '/src/components/gallery/GallerymainLayout.vue'
import FooterView from '../components/templates-layouts/footers/FooterView.vue'
import GalleryHeader from '/src/components/gallery/GalleryHeader.vue'
</script>
