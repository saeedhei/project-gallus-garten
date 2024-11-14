<template>
  <div v-if="currentPath === '/legal/datenschutzeinstellungen'">
    <div class="bg-white p-20 rounded-lg shadow-lg text-center">
      <div class="mb-4 text-3xl">Hinweis zu Cookies</div>
      <div class="mb-4 text-lg text-green-500">Wir speichern keine Ihrer Daten.</div>
      <button
        @click="updateWelcome"
        class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        alle ablehnen
      </button>
    </div>
  </div>

  <div
    v-if="!hasVisited"
    class="welcome-box fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-20 rounded-lg shadow-lg text-center">
      <div class="mb-4 text-3xl">Hinweis zu Cookies</div>
      <div class="mb-4 text-lg text-green-500">Wir speichern keine Ihrer Daten.</div>
      <button
        @click="dismissWelcome"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { setCookie, checkCookie, deleteCookie } from '../../cookieUtils'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = route.path

const hasVisited = ref(false)

const setFirstVisitCookie = () => {
  if (!checkCookie('firstVisit')) {
    setCookie('firstVisit', 'true', 7, 'None') // Cookie expires in 7 days
  } else {
    hasVisited.value = true
  }
}

const dismissWelcome = () => {
  hasVisited.value = true
}

const updateWelcome = () => {
  deleteCookie('firstVisit')
  // hasVisited.value = null;
}

onMounted(() => {
  setFirstVisitCookie()
})
</script>

<style scoped>
.welcome-box {
  z-index: 1000;
}
</style>

<!-- setCookie: Sets a cookie with the given name, value, and expiration time in days. -->
<!-- getCookie: Retrieves the value of a cookie by name. -->
<!-- checkCookie: Checks if a cookie exists by name. -->
<!-- setFirstVisitCookie: Checks if the firstVisit cookie is set. If not, it sets the cookie and logs a message. This function runs when the component is mounted using the onMounted hook. -->
