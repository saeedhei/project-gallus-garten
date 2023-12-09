<script setup lang="ts">
import { ref, watch } from 'vue';
import { appState } from '../stores/store';

const displayedRadioOptionValue = ref(appState.selectedRadio);

watch(() => appState.selectedRadio, (newValue) => {
  displayedRadioOptionValue.value = newValue;
});
</script>

<template>
  <div>
    <h1>Selected Value: {{ displayedRadioOptionValue }}</h1>
  </div>
</template>

