<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useRadioStore } from '@/stores/radio'
// import { makeAllEditable } from '@/stores/makeAllEditable'

const radioStore = useRadioStore()
const { radiostring } = storeToRefs(radioStore) // to keep reactivity

// Define a reactive variable to store the value of radiostring
const MyradioString = ref<string>(radiostring.value)

function handleTemplateSelection(selectedTemplate: string): string {
  switch (selectedTemplate) {
    case 'option1':
      return template1
    case 'option2':
      return template2
    case 'option3':
      return template3
    case 'option4':
      return template4
    case 'option5':
      return template5
    default:
      return ''
  }
}

const templateUrls = [
  '/gallus-garten/template1.html',
  '/gallus-garten/template2.html',
  '/gallus-garten/template3.html',
  '/gallus-garten/template4.html',
  '/gallus-garten/template5.html'
]

let template1 = ``
let template2 = ``
let template3 = ``
let template4 = ``
let template5 = ``

Promise.all(templateUrls.map((url) => fetch(url).then((res) => res.text())))
  .then((templates) => {
    template1 = templates[0]
    template2 = templates[1]
    template3 = templates[2]
    template4 = templates[3]
    template5 = templates[4]

    // The problem was likely due to timing issues. The `onMounted()` hook was executing before the templates were fetched and processed, leading to `MyradioString.value` being set before the templates were available. Moving the logic to set `MyradioString.value` inside the `.then()` callback of the `Promise.all()` ensured that it was executed only after the templates had been successfully fetched and processed, resolving the timing issue.
    // Set MyradioString.value after fetching and processing templates
    MyradioString.value = handleTemplateSelection('option1')
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error)
  })

// watch((radioStringgg) => {
//   selectedTemplate.value = handleTemplateSelection('option1')
// //   // makeAllEditable()
// })
// watch(() => radioStore.radiostring, (newValue, oldValue) => {
//   // Update the reactive variable with the new value
//   MyradioString.value = handleTemplateSelection(radiostring.value);
// });

watch(
  () => radioStore.radiostring,
  (newValue) => {
    MyradioString.value = handleTemplateSelection(newValue)
    // Use nextTick to ensure MyradioString.value is updated before onMounted
    // nextTick(() => {
    //   console.log(`After Watch: ${MyradioString.value}`)
    // })
  }
)

onMounted(() => {
  MyradioString.value = handleTemplateSelection(radiostring.value)
  //   // makeAllEditable()
})
// function saveToLocalStorage() {
//   // localStorage.setItem('localLivePreviewValue', livePreviewValue.value)
// }

// function loadFromLocalStorage() {
//   return localStorage.getItem('localLivePreviewValue') || ''
// }
</script>

<template>
  <div id="live" v-html="MyradioString"></div>

  <div id="editModal" class="modal">
    <div class="modal-content">
      <label for="fontSizeInput">Font Size:</label>
      <input
        type="number"
        id="fontSizeInput"
        placeholder="Enter font size"
        onchange="updateFontSize()"
      />
      <label for="textColorInput">Text Color:</label>
      <input type="color" id="textColorInput" onchange="updateTextColor()" />
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px;
}
</style>
