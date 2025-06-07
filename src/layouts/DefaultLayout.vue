<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from '../components/header/HeaderShort.vue'
import Footer from '../components/templates-layouts/footers/FooterView.vue'

const route = useRoute()

// Option A: Computed title directly from route meta
const title = computed(() => (route.meta.title as string) ?? 'GallusGarten')

// Optional: react to route change
// watch(() => route.meta.title, (newTitle) => {
//   // you can do something here like set document.title
// })
</script>

<template>
  <div>
    <Header :title="title" />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
