<!-- cspell:disable -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isSidenavOpen = ref(false)

const toggleNav = () => {
  isSidenavOpen.value = !isSidenavOpen.value
  updateSidenavStyles()
  if (isSidenavOpen.value) {
    document.addEventListener('click', closeNavOutside)
  } else {
    document.removeEventListener('click', closeNavOutside)
  }
}

const updateSidenavStyles = (): void => {
  const sidenavElement: HTMLElement = document.getElementById('mySidenav')!
  const overlayElement: HTMLElement = document.getElementById('overlay')!
  const transitionDuration = isSidenavOpen.value ? '0.9s' : '0.2s'

  sidenavElement.style.transition = `width ${transitionDuration}`
  overlayElement.style.display = isSidenavOpen.value ? 'block' : 'none'
}

const closeNav = () => {
  isSidenavOpen.value = false
  updateSidenavStyles()
  document.removeEventListener('click', closeNavOutside)
}

const closeNavOutside = (event: Event) => {
  const sidenavElement = document.getElementById('mySidenav')
  if (
    sidenavElement &&
    !(event.target as Element).closest('.sidenav') &&
    !(event.target as Element).matches('#mySidenavToggle')
  ) {
    closeNav()
  }
}

//////////////
const isHidden = ref(false)

const handleScroll = () => {
  isHidden.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="{
      fixed: true,
      'top-0': true,
      'left-0': true,
      'w-full': true,
      'bg-transparent': true,
      hidden: isHidden,
    }"
  >
    <div class="flex items-center justify-between w-full px-4">
      <!-- لوگو -->
      <a class="navbar-brand" href="/">
        <img
          v-animate:wobble="2"
          class="w-24 h-auto sm:w-32 sm:h-auto lg:w-40 lg:h-auto"
          src="/images/GallusGarten.svg"
          alt="Gallus Garten Logo"
        />
      </a>

      <!-- دکمه منو، همیشه نمایش داده شود -->
      <span id="mySidenavToggle" class="sidenav-toggle text-white" @click="toggleNav">
        &#9776;
        <span class="desktop-view md:text-left md:float-left desktop-view mr-1"
          >Alle Kategorien
        </span>
      </span>
    </div>

    <!-- ادامه منو و overlay همون نسخه قبل -->
    <div class="wrapper">
      <nav>
        <div>
          <div
            id="mySidenav"
            :class="['sidenav relative', { 'sidenav-open': isSidenavOpen }]"
            style="padding-top: 4rem"
          >
            <svg
              class="w-24 h-auto absolute top-2 left-2"
              version="1.1"
              viewBox="0 0 2956 1724"
              preserveAspectRatio="xMinYMin meet"
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

            <!-- Divider -->
            <div class="border-b border-gray-300 my-4"></div>

            <!-- <RouterLink
              to="/ueber-uns"
              class="nav-link block py-3 px-4 text-gray-700 hover:text-green-600 font-semibold transition"
            >
              Über uns
            </RouterLink>
            <RouterLink
              to="/"
              class="nav-link block py-3 px-4 text-gray-700 hover:text-green-600 font-semibold transition"
              >Digitalisierung für Alle</RouterLink
            >
            <RouterLink
              to="/"
              class="nav-link block py-3 px-4 text-gray-700 hover:text-green-600 font-semibold transition"
            >
              Onlinetraining<span class="blink-nav-item"> Neu</span>
            </RouterLink> -->
            <nav class="flex flex-col space-y-3 text-gray-300">
              <RouterLink
                to="/"
                class="block py-3 px-4 rounded hover:bg-gray-700 hover:text-white font-semibold transition"
              >
                Home
              </RouterLink>

              <RouterLink
                to="/ueber-uns"
                class="block py-3 px-4 rounded hover:bg-gray-700 hover:text-white font-semibold transition"
              >
                Über uns
              </RouterLink>

              <RouterLink
                to="/projekte"
                class="block py-3 px-4 rounded hover:bg-gray-700 hover:text-white font-semibold transition"
              >
                Projekte {<span class="blink-nav-item text-white text-xs font-bold rounded">
                  Neu </span
                >}
              </RouterLink>

              <RouterLink
                to="/kontakt"
                class="block py-3 px-4 rounded hover:bg-gray-700 hover:text-white font-semibold transition"
              >
                Kontakt
              </RouterLink>
            </nav>
          </div>
        </div>
      </nav>
    </div>

    <div
      id="overlay"
      v-if="isSidenavOpen"
      @click="closeNav"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 999;
      "
    ></div>
  </header>
</template>

<style scoped lang="scss">
$nav-width: 250px;

header {
  display: flex;
  // justify-content: space-between;
  align-items: top;
  padding: 20px;
  color: lightskyblue;
  line-height: 1.5;
  z-index: 1001; /* Ensure this is higher than the chevron */

  .navbar-brand {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .wrapper {
    .blink-nav-item {
      color: green;
      font-size: 14px;
      font-weight: bold;
      animation-name: blinker;
      animation-duration: 0.7s;
      animation-timing-function: step-end;
      animation-iteration-count: infinite;
    }

    @keyframes blinker {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: #111111;
    overflow-x: hidden;
    padding-top: 60px;
    transition: width 0.3s ease;

    &-open {
      width: 20vw; /* پیش فرض دسکتاپ: 30 درصد عرض صفحه */
    }

    @media (max-width: 1024px) {
      /* تبلت و پایین‌تر */
      &-open {
        width: 35vw; /* 50 درصد عرض صفحه */
      }
    }

    @media (max-width: 640px) {
      /* موبایل و پایین‌تر */
      &-open {
        width: 75vw; /* 70 درصد عرض صفحه */
      }
    }

    a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;

      &:hover {
        color: #f1f1f1;
      }
    }
  }

  .sidenav-toggle {
    font-size: 30px;
    cursor: pointer;
    margin-left: auto;
  }
}

@media (max-width: 767px) {
  .desktop-view {
    display: none;
  }
}

.hidden {
  display: none;
}
</style>
