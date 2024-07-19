<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width="100"
    height="100"
    class="absolute bottom-10 text-white light-icon"
    style="animation-duration: 1s"
  >
    <circle cx="15" cy="15" r="6" fill="none" stroke="currentColor" stroke-width="0.5" />
    <path
      transform="translate(11, 11) scale(0.5)"
      fill="currentColor"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
</template>

<style scoped>
@keyframes lightMove {
  0% {
    bottom: 10px;
  }
  50% {
    bottom: 20px;
  }
  100% {
    bottom: 10px;
  }
}

.light-icon {
  animation: lightMove 2s infinite;
}
</style>
