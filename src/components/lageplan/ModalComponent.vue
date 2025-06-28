<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
      <button @click="close" class="absolute top-3 right-3 text-gray-500 hover:text-black">
        ✕
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}
</script>
