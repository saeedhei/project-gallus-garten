<!--<template>
  <div class="relative w-full h-full bg-gray-200 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-shimmer"></div>

    <div class="absolute inset-2 bg-gray-400 rounded-md flex items-center justify-center text-gray-600">
      <div class="w-2/3 h-1/3 bg-gray-300 rounded"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
});
</script>

<style scoped>
/* Shimmer animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style> -->

<template>
  <div class="relative w-full h-full bg-gray-200 overflow-hidden p-4 rounded-md">
    <!-- Gradient Animation -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-shimmer"
    ></div>

    <!-- Placeholder for Image -->
    <div class="relative h-3/4 w-full bg-gray-300 rounded-md overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 animate-shimmer"
      ></div>
    </div>

    <!-- Placeholder for Text -->
    <div class="mt-2 space-y-2">
      <div class="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
      <div class="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* This is a standalone Skeleton component. You can reuse it wherever needed. */
</script>

<style scoped>
/* Shimmer animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite linear;
}
</style>
