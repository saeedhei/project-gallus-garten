<template>
  <div class="column">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  size?: string
  alignment?: string
}>()
</script>

<style scoped>
.column[size] {
  width: var(--size);
}

.column[alignment] {
  align-items: var(--alignment);
}
</style>
