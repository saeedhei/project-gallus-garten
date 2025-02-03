<template>
  <div
    class="relative w-full h-full bg-gray-100 overflow-hidden rounded-lg flex items-center justify-center"
  >
    <!-- Shimmer Background -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
    ></div>

    <!-- Skeleton Content -->
    <div class="w-4/5 h-4/5 flex flex-col items-center justify-center">
      <!-- Placeholder for image -->
      <div class="h-2/3 w-full bg-gray-300 rounded-md overflow-hidden relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"
        ></div>
      </div>

      <!-- Placeholder for text -->
      <div class="mt-4 space-y-3 w-full">
        <div class="h-4 w-3/4 bg-gray-300 rounded animate-pulse mx-auto"></div>
        <div class="h-4 w-1/2 bg-gray-300 rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Shimmer Animation */
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
