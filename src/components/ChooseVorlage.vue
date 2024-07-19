<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRadioStore } from '@/stores/radio'
const radioStore = useRadioStore()
const { updateString } = radioStore
const { radiostring } = storeToRefs(radioStore) // to keep reactivity

const options = [
  { value: 'option1', label: 'Vorlage 1' },
  { value: 'option2', label: 'Vorlage 2' },
  { value: 'option3', label: 'Vorlage 3' },
  { value: 'option4', label: 'Vorlage 4' },
  { value: 'option5', label: 'Vorlage 5' }
]
</script>

<template>
  <div class="radioButton" style="display: flex; justify-content: space-between; padding-top: 20px">
    <label v-for="option in options" :key="option.value">
      <input type="radio" @click="updateString(option.value)" />
      {{ option.label }}
    </label>
  </div>
</template>

<style scoped>
.radioButton label {
  display: flex;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition:
    background-color 0.3s,
    color 0.3s;
  color: #fff;
  background-color: #378805;
  border: 2px solid #b0e88d;
  padding: 15px 15px;
}

.radioButton label:hover {
  cursor: pointer;
  background-color: #98ff98;
  color: black;
  border-color: #2d6e02;
}

.radioButton label input[type='radio'] {
  margin-right: 5px;
  /* Add some space to the right of the radio button */
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
</style>

<!-- 

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const { selectedOption } = defineProps(['selectedOption'])
const emit = defineEmits(['radio-clicked'])

const options = [
  { value: 'option1', label: 'Vorlage 1' },
  { value: 'option2', label: 'Vorlage 2' },
  { value: 'option3', label: 'Vorlage 3' },
  { value: 'option4', label: 'Vorlage 4' },
  { value: 'option5', label: 'Vorlage 5' }
]

const emitRadioButtonClicked = (optionValue: string) => {
  emit('radio-clicked', optionValue);
};
</script>

<template>
  <div class="radioButton" style="display: flex; justify-content: space-between; padding-top: 20px">
    <label v-for="option in options" :key="option.value">
      <input
        type="radio"
        :checked="selectedOption === option.value"
        @change="() => emitRadioButtonClicked(option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template> -->
