<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { appState } from '../stores/store'
import { useEventBusStore } from '@/stores/eventBus'

const displayedRadioOptionValue = ref(appState.selectedRadio)
const livePreviewValue = ref('')

const eventBusStore = useEventBusStore()
const sendDataToChildA = () => {
  // Update the shared data in the store
  eventBusStore.setSharedData(livePreviewValue.value)
}

watch(
  () => appState.selectedRadio,
  (newValue) => {
    displayedRadioOptionValue.value = newValue
    livePreviewValue.value = handleTemplateSelection(displayedRadioOptionValue.value)
    sendDataToChildA()
    saveToLocalStorage()
  }
)

// get live data
const sharedData = ref(eventBusStore.sharedData)
// Listen for changes in the store
const unwatch = eventBusStore.$subscribe(() => {
  sharedData.value = eventBusStore.$state.sharedData
})
// Cleanup the subscription when the component is unmounted
onBeforeUnmount(() => {
  unwatch()
})

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
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error)
  })

onMounted(() => {
  // Load from local storage on component mount
  livePreviewValue.value = loadFromLocalStorage()
  makeAllEditable()
})

function saveToLocalStorage() {
  localStorage.setItem('localLivePreviewValue', livePreviewValue.value)
}

function loadFromLocalStorage() {
  return localStorage.getItem('localLivePreviewValue') || ''
}

let htmlInput: HTMLInputElement | null
let livePreview: HTMLElement | null

document.addEventListener('DOMContentLoaded', function () {
  // Code to run when the DOM is ready
  livePreview = document.getElementById('live')
  htmlInput = document.getElementById('html-input') as HTMLInputElement | null

  // Check if livePreview is not null before using it
  if (livePreview !== null) {
    makeAllEditable()
  } else {
    console.error("Element with id 'live' not found in the DOM.")
  }
})

// Function to make all elements editable
function makeAllEditable() {
  const editableElements = document.querySelectorAll('[contenteditable="true"]')
  editableElements.forEach((element) => {
    makeEditable(element)
  })
}

// Function to make an element editable
function makeEditable(element: Element) {
  element.addEventListener('input', editAndSaveToLocalStorage)
}

function editAndSaveToLocalStorage() {
  if (livePreview !== null) {
    if (htmlInput !== null) {
    htmlInput.value = livePreview?.innerHTML ?? '';
    const inputValue = htmlInput.value
    localStorage.setItem('localLivePreviewValue', inputValue)
    }else {
    console.error("Element with id 'htmlInput' is null.")
  }
  } else {
    console.error("Element with id 'live' is null.")
  }
}

</script>

<template>
  <!-- <div>{{ livePreviewValue }}</div> -->
  <div id="live" v-html="sharedData" ref="liveElement"></div>

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
  <!-- <button @click="provideUsername">Provide Username</button> -->
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
