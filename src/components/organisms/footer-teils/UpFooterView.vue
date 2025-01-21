<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Define state variables
const frankfurtTime = ref<string>('')
const labelClass = ref<string>('black')
const labelText = ref<string>("Sorry, we're closed!")

// Function to update Frankfurt time and label state
const updateTime = () => {
  // Get Frankfurt time (Europe/Berlin)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Berlin',
    hour: '2-digit', // Correct type for hour, minute, and second
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const frankfurtTimeStr = new Intl.DateTimeFormat([], options).format(new Date())
  frankfurtTime.value = frankfurtTimeStr

  // Get current hour in Frankfurt
  const currentHour = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    hour12: false,
  })

  // Update label class and text based on time
  if (parseInt(currentHour) >= 8 && parseInt(currentHour) < 17) {
    labelClass.value = 'green'
    labelText.value = 'Jetzt verfügbar!'
  } else {
    labelClass.value = 'black'
    labelText.value = 'Jetzt nicht verfügbar!'
  }
}

// Update time every second on mounted
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <footer
    class="text-center flex flex-col px-4 py-12 sm:text-left lg:px-16 md:px-8 xl:px-24 xxl:px-40"
  >
    <div class="sm:flex flex-wrap">
      <div class="sm:w-1/2 lg:w-1/5">
        <h6 class="text-sm text-gray-600 font-bold uppercase">Contact</h6>

        <div class="mt-4">
          <a href="mailto:GallusGarten-Galluswarte@web.de" class="block text-md text-gray-900"
            >GallusGarten-Galluswarte@web.de</a
          >
          <a href="#" class="block text-md text-gray-900 mt-2"
            >Gallusgarten II <br />60327 Frankfurt am Main</a
          >
          <!-- Frankfurt Time and Availability Button -->
          <div class="mt-2">
            <p class="text-gray-800">Lokale Uhrzeit in Frankfurt: {{ frankfurtTime }}</p>
            <div
              :class="labelClass"
              class="shiny-label inline-block px-2 py-1 text-white rounded-lg"
            >
              {{ labelText }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 sm:w-1/2 sm:mt-0 lg:w-1/5 lg:mt-0">
        <h6 class="text-sm text-gray-600 font-bold uppercase">Unternehmen</h6>
        <ul class="mt-4">
          <li><a href="#">Service</a></li>
          <li class="mt-2"><a href="#">Newsletter</a></li>
          <li class="mt-2"><a href="#">Flohmarkt</a></li>
        </ul>
      </div>

      <div class="mt-8 sm:w-1/2 sm:mt-12 lg:w-1/5 lg:mt-0">
        <h6 class="text-sm text-gray-600 font-bold uppercase">Legal</h6>
        <ul class="mt-4">
          <li><router-link to="/legal/impressum">Impressum</router-link></li>
          <li class="mt-2"><router-link to="/legal/datenschutz">Datenschutz</router-link></li>
          <li class="mt-2">
            <router-link to="/legal/datenschutzeinstellungen">Datenschutzeinstellungen</router-link>
          </li>
        </ul>
      </div>

      <div class="mt-12 sm:w-1/2 lg:w-2/5 lg:mt-0 lg:pl-12">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="230"
            height="50"
            viewBox="0 0 230 50"
            class="mx-auto sm:mx-0"
          >
            <g transform="translate(-193 -27)">
              <text
                transform="translate(280 56)"
                fill="white"
                font-size="24"
                font-family="ArialRoundedMTBold, Arial Rounded MT"
              >
                <tspan x="0" y="0">GallusGarten</tspan>
              </text>
              <g transform="translate(120 27)">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="100%"
                  viewBox="0 0 2956 1724"
                  enable-background="new 0 0 2956 1724"
                  xml:space="preserve"
                >
                  <rect width="2740" height="1750" x="140" y="0" style="fill: #fff" />
                  <rect width="773" height="1550" x="400" y="84" style="fill: #71c43e" />
                  <rect width="773" height="1550" x="1810" y="84" style="fill: #71c43e" />
                  <text
                    x="270"
                    y="790"
                    font-family="Tahoma"
                    font-size="680"
                    font-weight="bold"
                    fill="#253C17"
                  >
                    GALLUS
                  </text>
                  <text
                    x="240"
                    y="1400"
                    font-family="Tahoma"
                    font-size="680"
                    font-weight="bold"
                    fill="#253C17"
                  >
                    GARTEN
                  </text>
                </svg>
              </g>
            </g>
          </svg>
        </div>

        <p class="text-base text-green-200 mt-4">
          Ein Garten für Alle – Urban Gardening im Gallus – Bürgergarten.
        </p>
        <div class="flex-col mx-auto md:flex-row justify-between space-x-4">
          <img
            src="https://frankfurt.de/-/media/frankfurtde/global/image/seitenrahmen/footerlogo.ashx?la=de-de6b171b43a6e644fb88df64df25328a18&mw=1280&hash=3C8D80D1E72F6317B5444810BE0CF329"
            alt="frankfurtde"
            class="inline h-10 border border-gray-300 rounded-md p-1 shadow transition duration-300 transform hover:shadow-2xl hover:scale-105"
          />
          <img
            src="/src/assets/images/Amt67_Logo_full.png"
            alt="gruenflaechenamt"
            class="inline h-12 border border-gray-300 rounded-md p-1 mt-1 shadow transition duration-300 transform hover:shadow-2xl hover:scale-105"
          />
        </div>
      </div>
    </div>

    <!-- <div class="mt-12">

    </div> -->
  </footer>
</template>

<style scoped>
a {
  color: black;
}

.black {
  background-color: black !important;
}

.green {
  background-color: green !important;
}

/* Shiny label effect */
.shiny-label {
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.25) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.25) 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: shiny-effect 10s linear infinite;
  color: white;
}

@keyframes shiny-effect {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>

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
