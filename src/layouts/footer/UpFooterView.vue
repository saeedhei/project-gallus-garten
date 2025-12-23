<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define state variables
const frankfurtTime = ref<string>('');
const labelClass = ref<string>('black');
const labelText = ref<string>("Sorry, we're closed!");

// Function to update Frankfurt time and label state
const updateTime = () => {
  // Get Frankfurt time (Europe/Berlin)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Berlin',
    hour: '2-digit', // Correct type for hour, minute, and second
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const frankfurtTimeStr = new Intl.DateTimeFormat([], options).format(new Date());
  frankfurtTime.value = frankfurtTimeStr;

  // Get current hour in Frankfurt
  const currentHour = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    hour12: false,
  });

  // Update label class and text based on time
  if (parseInt(currentHour) >= 8 && parseInt(currentHour) < 17) {
    labelClass.value = 'green';
    labelText.value = 'Jetzt verfügbar!';
  } else {
    labelClass.value = 'black';
    labelText.value = 'Jetzt nicht verfügbar!';
  }
};

// Update time every second on mounted
onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
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
        <!-- Logo + Name -->
        <div class="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 mb-6">
          <img
            class="h-18 object-contain"
            src="/images/GallusGarten.svg"
            alt="Gallus Garten Logo"
          />
          <span
            class="mt-2 sm:mt-0 text-white text-xl sm:text-2xl lg:text-3xl font-semibold text-center sm:text-left"
          >
            GallusGarten
          </span>
        </div>

        <p class="text-base text-white mb-6 text-center sm:text-left">
          Wo Generationen gemeinsam gärtnern und gestalten.
        </p>

        <!-- Partner Section -->
        <h6 class="text-sm text-green-200 font-bold uppercase mb-2 text-center sm:text-left">
          Partner der Stadt Frankfurt
        </h6>

        <div class="flex flex-wrap justify-center sm:justify-start items-center gap-4 mb-4">
          <div class="logo-box">
            <a
              href="https://www.demokratie-leben.de/dl/programm/programmbereiche/partnerschaften-fuer-demokratie/"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              <img
                src="/logos/(1)  Logo Partnerschaft für Demokratie Frankfurt.jpg"
                class="h-12 object-contain"
              />
            </a>
          </div>
          <div class="logo-box">
            <a
              href="https://www.demokratie-leben.de/"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              <img
                src="/logos/(2) Logo BundesprogrammDemokratie leben.png"
                class="h-12 object-contain"
              />
            </a>
          </div>
          <div class="logo-box">
            <a href="https://frankfurt.de/" target="_blank" class="text-blue-600 hover:underline">
              <img
                src="/logos/(3) Logo der Stadt Frankfurt am Main.jpg"
                class="h-12 object-contain"
              />
            </a>
          </div>
        </div>

        <!-- Kooperation -->
        <h6 class="text-sm text-green-200 font-bold uppercase mb-2 text-center sm:text-left">
          In Kooperation mit
        </h6>

        <div class="flex flex-wrap justify-center sm:justify-start items-center gap-4">
          <div class="logo-box">
            <img
              src="/logos/Amt67_Logo_full.png"
              alt="gruenflaechenamt"
              class="h-12 object-contain"
            />
          </div>
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

.logo-box {
  background: white;
  padding: 6px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
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
