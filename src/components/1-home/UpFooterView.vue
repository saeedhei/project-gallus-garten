<script setup lang="ts">
import LeftUpfooterView from './LeftUpfooterView.vue'
import RightUpfooterView from './RightUpfooterView.vue'
</script>

<template>
  <div class="container">
    <div class="flex flex-col md:flex-row">
      <div class="w-fully md:w-1/4 px-4 mb-4 md:mb-0"><LeftUpfooterView /></div>
      <div class="w-3/4 px-4"><RightUpfooterView /></div>
    </div>
  </div>
</template>

<!-- <div class="container">
  <div class="grid grid-cols-3 gap-4 md:grid-cols-1">
    <div class="col">Content 1</div>
    <div class="col">Content 2</div>
    <div class="col">Content 3</div>
  </div>
</div> -->

<!-- <div class="container">
  <div class="flex flex-col md:flex-row">
    <div class="w-1/3 px-4 mb-4 md:mb-0">Content 1</div>
    <div class="w-1/3 px-4 mb-4 md:mb-0">Content 2</div>
    <div class="w-1/3 px-4">Content 3</div>
  </div>
</div> -->
