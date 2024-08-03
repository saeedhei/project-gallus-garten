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
      hidden: isHidden
    }"
  >
    <a class="navbar-brand" href="/">
      <svg
        class="w-24 h-auto sm:w-32 sm:h-auto lg:w-48 lg:h-auto"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 2956 1724"
        preserveAspectRatio="xMinYMin meet"
        xml:space="preserve"
      >
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
    </a>

    <div class="wrapper">
      <nav>
        <div>
          <div id="mySidenav" :class="['sidenav', { 'sidenav-open': isSidenavOpen }]">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
            <RouterLink to="/" class="nav-link">Gude</RouterLink>
            <RouterLink to="/ueber-uns" class="nav-link">Über uns</RouterLink>
            <RouterLink to="/" class="nav-link">Digitalisierung für Alle</RouterLink>
            <RouterLink to="/" class="nav-link"
              >Onlinetraining<span class="blink-nav-item"> Neu</span>
            </RouterLink>
          </div>

          <span id="mySidenavToggle" class="sidenav-toggle text-white" @click="toggleNav"
            >&#9776; <span class="desktop-view">Alle Kategorien</span></span
          >
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
        z-index: 9998;
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

  .navbar-brand {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .wrapper {
    .blink-nav-item {
      color: #ff2737;
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
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: #111111;
    overflow-x: hidden;
    padding-top: 60px;

    &-open {
      width: $nav-width;
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

    .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }
  }

  .sidenav-toggle {
    font-size: 30px;
    cursor: pointer;
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
