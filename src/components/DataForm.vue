<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
// import { appState } from '../stores/store'
// import { useEventBusStore } from '@/stores/eventBus'

// const eventBusStore = useEventBusStore()
// const sharedData = ref(eventBusStore.sharedData)
// Listen for changes in the store
// const unwatch = eventBusStore.$subscribe(() => {
// sharedData.value = eventBusStore.$state.sharedData
// })
// Cleanup the subscription when the component is unmounted
// onBeforeUnmount(() => {
// unwatch()
// })

const formData = ref({
  from: '',
  to: '',
  subject: ''
  // html: sharedData
})

const submitForm = () => {
  // Handle form submission logic here
  console.log('Form submitted:', formData.value)
  // You can send data to the server or perform any other necessary actions
}

// watch(
//   () => appState.selectedRadio,
//   (newValue) => {
//     // Update formData.html directly from appState.livePreview
//     formData.value.html = sharedData.value
//   }
// )

// watch(
//   () => formData.value.html,
//   (newValue) => {
//     eventBusStore.setSharedData(newValue)
//     saveToLocalStorage()
//   }
// )

// onMounted(() => {
//   // Load from local storage on component mount
//   formData.value.html = loadFromLocalStorage()
// })

// function saveToLocalStorage() {
//   localStorage.setItem('localLivePreviewValue', sharedData.value)
// }

function loadFromLocalStorage() {
  return localStorage.getItem('localLivePreviewValue') || ''
}
</script>

<template>
  <div>
    <form @submit.prevent="submitForm" action="/api/gg" method="post">
      <input type="email" v-model="formData.from" name="from" placeholder="From" />
      <input type="email" v-model="formData.to" name="to" placeholder="To" />
      <input type="text" v-model="formData.subject" name="subject" placeholder="Subject" />
      <!-- <textarea
        v-model="formData.html"
        name="html"
        placeholder="HTML message"
        id="html-input"
      ></textarea> -->
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style scoped>
form {
  width: 700px;
  margin: 0 auto;
  padding: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type='submit'] {
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

input[type='submit']:hover {
  background-color: #333;
}

textarea {
  height: 150px;
}

label {
  display: block;
  margin-bottom: 10px;
}

form > div {
  margin-bottom: 10px;
}
</style>
