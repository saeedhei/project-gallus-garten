<template>
  <div class="column">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  size?: string
  alignment?: string
}>()
</script>

<style scoped>
.column[size] {
  width: 50%;
}

.column[alignment] {
  align-items: var(--alignment);
}
</style>
