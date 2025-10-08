<template>
  <div class="crooked-section" :style="{ '--top-color': topcolor }">
    <div class="content">
      <!-- <h2>Crooked Section</h2> -->
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  topcolor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  topcolor: '#f3f4f6', // default top color (bg-gray-100)
});

const { topcolor } = props;
</script>

<style scoped>
.crooked-section {
  position: relative;
  padding: 20px 0;
}

.crooked-section:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 30%, 0 100%);
  background-color: var(--top-color); /* استفاده از topcolor prop */
}

.content {
  padding: 20px;
  transform: skewY(-5deg);
  transform-origin: 0;
}

.content h2 {
  transform: skewY(5deg);
}
</style>
