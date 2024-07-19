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
      <!-- <svg width="161.23" height="79.901" viewBox="0 0 161.23 79.901" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMid meet">
        <g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" font-size="9pt" stroke="#000" stroke-width="0.25mm"
          fill="none" style="stroke:lightskyblue;stroke-width:0.25mm;fill:none">
          <path style="fill:lightskyblue;"
            d="M 57.5 78.5 L 57 68.3 L 64.3 66.3 L 64.3 28 A 26.845 26.845 0 0 0 64.281 26.946 Q 64.219 25.39 63.961 24.696 A 1.902 1.902 0 0 0 63.9 24.55 Q 63.56 23.827 62.28 23.213 A 9.252 9.252 0 0 0 61.8 23 L 56.8 20.1 L 57.1 11.1 L 111.4 11.1 Q 112.1 21.6 112.1 31.6 L 104.7 32.1 L 97.6 23.3 L 82.5 22.9 L 82.5 39.2 L 103.8 37.4 L 103.8 52.8 L 82.5 50.5 L 82.5 66.6 L 99.1 66.3 L 106.8 57.5 L 114.2 58 Q 113.8 68.5 112.7 78.5 L 57.5 78.5 Z M 1.6 57.9 L 9.3 56.4 L 14.3 64.9 A 44.392 44.392 0 0 0 18.603 66.18 Q 20.742 66.692 22.667 66.885 A 22.482 22.482 0 0 0 24.9 67 Q 26.5 67 31.7 66.1 Q 31.873 64.369 31.896 63.612 A 6.958 6.958 0 0 0 31.9 63.4 A 11.584 11.584 0 0 0 31.829 62.076 Q 31.666 60.66 31.124 59.788 A 3.435 3.435 0 0 0 31.1 59.75 A 4.406 4.406 0 0 0 30.5 59.023 Q 29.541 58.064 27.6 56.95 Q 25.114 55.523 18.981 52.781 A 336.841 336.841 0 0 0 17.9 52.3 Q 9.3 48.1 5.5 43.25 A 17.84 17.84 0 0 1 1.715 32.631 A 22.365 22.365 0 0 1 1.7 31.8 A 24.291 24.291 0 0 1 2.664 24.775 A 18.459 18.459 0 0 1 8.7 15.7 A 23.669 23.669 0 0 1 17.453 11.217 Q 22.086 9.9 27.9 9.9 Q 33.8 9.9 39.65 11.05 Q 45.5 12.2 49.9 14.2 Q 49.705 19.667 49.033 27.706 A 505.838 505.838 0 0 1 49 28.1 L 48.7 32.4 L 41.4 33.5 L 33.8 23.8 Q 31.012 22.948 27.145 22.756 A 47.29 47.29 0 0 0 24.8 22.7 Q 21.925 22.7 20.266 23.129 A 6.862 6.862 0 0 0 19.7 23.3 A 25.791 25.791 0 0 0 19.458 24.354 Q 19.248 25.376 19.209 26.091 A 5.68 5.68 0 0 0 19.2 26.4 A 7.431 7.431 0 0 0 19.501 28.552 A 6.337 6.337 0 0 0 20.3 30.25 Q 21.4 31.9 24.2 33.65 Q 26.344 34.99 30.07 36.828 A 162.447 162.447 0 0 0 32.5 38 Q 40.5 41.8 44.6 44.7 Q 48.7 47.6 50.35 50.75 A 13.837 13.837 0 0 1 51.637 54.478 Q 52 56.291 52 58.4 A 19.869 19.869 0 0 1 50.594 66.006 Q 48.667 70.705 44.1 74 Q 37.82 78.531 27.749 79.46 A 59.358 59.358 0 0 1 22.3 79.7 Q 11.3 79.7 0 76.3 Q 0.5 66.4 1.6 57.9 Z M 228.1 78.4 L 227.6 68.9 L 233.8 67.1 L 233.8 42.9 Q 233.8 40.965 233.568 40.229 A 1.521 1.521 0 0 0 233.5 40.05 A 1.737 1.737 0 0 0 233.238 39.656 Q 232.934 39.3 232.365 38.904 A 9.802 9.802 0 0 0 231.9 38.6 L 227.5 36.2 L 227.8 28.7 L 230 28.3 A 305.79 305.79 0 0 1 236.094 27.15 Q 244.55 25.65 248.9 25.5 A 26.949 26.949 0 0 1 249.821 28.429 A 32.622 32.622 0 0 1 250.2 30.1 Q 256.022 27.428 259.794 26.35 A 30.384 30.384 0 0 1 260.15 26.25 A 30.862 30.862 0 0 1 264.226 25.416 A 24.246 24.246 0 0 1 267.4 25.2 A 18.91 18.91 0 0 1 274.169 26.314 Q 283.3 29.802 283.3 44.2 L 283.3 63.8 A 23.402 23.402 0 0 0 283.314 64.652 Q 283.366 66.053 283.6 66.6 Q 283.842 67.165 284.802 67.796 A 9.419 9.419 0 0 0 285.3 68.1 L 290.1 70.9 L 289.7 78.4 L 262.1 78.4 L 261.6 68.9 L 266.5 67.5 L 266.5 48.6 Q 266.5 44.175 266.21 42.361 A 9.332 9.332 0 0 0 266.2 42.3 Q 265.9 40.5 264.55 39.5 A 3.848 3.848 0 0 0 263.522 38.978 Q 262.471 38.612 260.843 38.526 A 19.918 19.918 0 0 0 259.8 38.5 A 30.641 30.641 0 0 0 257.1 38.63 Q 255.705 38.754 254.105 38.997 A 73.818 73.818 0 0 0 250.7 39.6 L 250.7 63.8 A 23.402 23.402 0 0 0 250.714 64.652 Q 250.766 66.053 251 66.6 Q 251.253 67.191 252.219 67.853 A 9.216 9.216 0 0 0 252.6 68.1 L 257.5 70.9 L 257.1 78.4 L 228.1 78.4 Z M 296.7 62.2 L 296.7 37.9 L 289.7 37.9 L 289.7 30.6 L 307.7 14.2 L 313.5 14.9 L 313.5 26.2 L 330.3 26.2 L 330.3 38 L 313.5 38 L 313.5 58.6 A 26.757 26.757 0 0 0 313.574 60.674 Q 313.731 62.676 314.217 63.896 A 3.992 3.992 0 0 0 314.85 65 A 3.613 3.613 0 0 0 316.15 65.943 Q 317.343 66.483 319.243 66.579 A 16.973 16.973 0 0 0 320.1 66.6 Q 322.952 66.6 327.745 65.928 A 130.312 130.312 0 0 0 329.3 65.7 L 330.5 75.9 Q 326.9 77.6 322.45 78.7 A 37.757 37.757 0 0 1 316.76 79.67 A 32.042 32.042 0 0 1 313.9 79.8 Q 308.242 79.8 304.486 78.002 A 12.325 12.325 0 0 1 300.9 75.45 A 13.497 13.497 0 0 1 297.903 70.423 Q 297.17 68.314 296.884 65.722 A 32.121 32.121 0 0 1 296.7 62.2 Z M 127.25 71.5 A 24.077 24.077 0 0 0 133.842 76.278 Q 141.099 79.9 152 79.9 A 45.363 45.363 0 0 0 160.207 79.19 A 33.4 33.4 0 0 0 170.45 75.6 Q 178.2 71.3 182.3 63.2 A 36.849 36.849 0 0 0 185.615 53.107 A 51.352 51.352 0 0 0 186.4 43.9 Q 186.4 17.459 166.319 11.52 A 47.023 47.023 0 0 0 153 9.8 A 43.222 43.222 0 0 0 145.533 10.419 A 32.09 32.09 0 0 0 134.9 14.2 Q 127.3 18.6 123.2 26.75 A 37.121 37.121 0 0 0 119.942 36.546 A 50.553 50.553 0 0 0 119.1 46 A 61.429 61.429 0 0 0 119.437 52.595 Q 120.757 64.808 127.25 71.5 Z M 336.5 78.5 L 336 69 L 342.1 67.2 L 342.1 42.9 Q 342.1 40.965 341.868 40.229 A 1.521 1.521 0 0 0 341.8 40.05 A 1.737 1.737 0 0 0 341.538 39.656 Q 341.234 39.3 340.665 38.904 A 9.802 9.802 0 0 0 340.2 38.6 L 335.8 36.2 L 336.1 28.7 A 28.569 28.569 0 0 1 337.305 28.442 Q 337.866 28.335 338.358 28.27 A 13.239 13.239 0 0 1 339 28.2 A 253.247 253.247 0 0 1 344.656 27.094 Q 352.55 25.65 356.9 25.5 A 36.861 36.861 0 0 1 357.561 27.633 Q 357.83 28.598 358.09 29.689 A 75.84 75.84 0 0 1 358.6 32 A 80.775 80.775 0 0 1 362.174 29.346 Q 365.726 26.867 368.51 25.627 A 22.025 22.025 0 0 1 368.8 25.5 L 374.5 25.5 Q 374.4 29.3 374 33.75 A 93.02 93.02 0 0 1 373.73 36.36 Q 373.423 38.957 373.026 40.779 A 27.135 27.135 0 0 1 373 40.9 Q 369.4 40.7 367.7 40.7 A 77.432 77.432 0 0 0 360.399 41.056 A 86.802 86.802 0 0 0 359 41.2 L 359 63.9 A 23.402 23.402 0 0 0 359.014 64.752 Q 359.066 66.153 359.3 66.7 Q 359.553 67.291 360.519 67.953 A 9.216 9.216 0 0 0 360.9 68.2 L 366.9 71.4 L 366.5 78.5 L 336.5 78.5 Z M 383.65 73.3 A 18.42 18.42 0 0 0 388.455 76.87 Q 394.074 79.8 402.6 79.8 Q 415.3 79.8 422.35 72.45 A 22.691 22.691 0 0 0 424.61 69.689 Q 427.405 65.668 428.569 60.316 A 39.13 39.13 0 0 0 429.4 52 Q 429.4 31.272 413.906 26.576 A 35.909 35.909 0 0 0 403.5 25.2 Q 395.5 25.2 389.6 28.6 Q 383.7 32 380.55 38.4 A 29.55 29.55 0 0 0 378.081 45.88 A 39.613 39.613 0 0 0 377.4 53.4 A 48.372 48.372 0 0 0 377.708 59.014 Q 378.159 62.867 379.269 65.993 A 20.051 20.051 0 0 0 383.65 73.3 Z M 193.1 78.5 L 192.8 69.3 L 199.8 67.2 L 199.8 42.9 A 21.72 21.72 0 0 0 199.783 42.012 Q 199.731 40.742 199.516 40.194 A 1.326 1.326 0 0 0 199.45 40.05 A 1.852 1.852 0 0 0 199.17 39.673 Q 198.706 39.175 197.7 38.6 L 193.3 36.2 L 193.8 28.7 Q 202.1 27.1 206.65 26.35 Q 211.2 25.6 215 25.5 Q 216.3 29.8 216.6 31.9 L 216.6 63.9 A 23.402 23.402 0 0 0 216.614 64.752 Q 216.666 66.153 216.9 66.7 Q 217.142 67.265 218.102 67.896 A 9.419 9.419 0 0 0 218.6 68.2 L 223.5 71 L 223.1 78.5 L 193.1 78.5 Z M 154.1 66.1 Q 159.8 66.1 165 63.2 A 27.165 27.165 0 0 0 165.755 60.657 Q 166.107 59.237 166.384 57.586 A 56.464 56.464 0 0 0 166.7 55.45 Q 167.3 50.8 167.3 46.3 A 47.66 47.66 0 0 0 166.934 40.185 Q 166.532 37.081 165.686 34.554 A 18.501 18.501 0 0 0 163.15 29.5 Q 159 23.8 151 23.8 Q 145.3 23.8 140 25.9 A 8.25 8.25 0 0 0 139.421 27.163 Q 138.731 29.023 138.3 32.15 Q 137.74 36.211 137.703 41.362 A 102.222 102.222 0 0 0 137.7 42.1 Q 137.7 53.7 141.9 59.9 A 13.44 13.44 0 0 0 151.664 65.945 A 18.531 18.531 0 0 0 154.1 66.1 Z M 407.378 67.82 A 10.888 10.888 0 0 0 407.7 67.75 Q 409.2 67.4 410.9 66.6 A 28.163 28.163 0 0 0 411.305 64.779 Q 411.644 63.006 411.9 60.7 A 64.771 64.771 0 0 0 412.275 55.469 A 56.348 56.348 0 0 0 412.3 53.8 A 41.325 41.325 0 0 0 412.075 49.334 Q 411.543 44.453 409.75 41.5 A 8.92 8.92 0 0 0 407.274 38.781 Q 405.169 37.3 402.2 37.3 A 25.9 25.9 0 0 0 396.031 38.065 A 28.984 28.984 0 0 0 395.5 38.2 A 7.585 7.585 0 0 0 395.13 39.19 Q 394.796 40.288 394.55 41.931 A 38.104 38.104 0 0 0 394.4 43.05 Q 394.027 46.178 394.002 50.133 A 90.426 90.426 0 0 0 394 50.7 Q 394 55.997 395.054 59.743 A 16.241 16.241 0 0 0 396.65 63.6 A 10.13 10.13 0 0 0 398.738 66.162 Q 400.949 68.07 404.1 68.1 A 10.595 10.595 0 0 0 404.2 68.1 Q 405.989 68.1 407.378 67.82 Z M 201.2 19.8 L 197 4.5 L 214 0 L 218.1 15.2 L 201.2 19.8 Z" />
        </g>
      </svg> -->
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
        <rect width="773" height="1550" x="400" y="84" style="fill: #71c43e" />
        <rect width="773" height="1550" x="1810" y="84" style="fill: #71c43e" />
        <text
          x="140"
          y="790"
          font-family="Tahoma"
          font-size="680"
          font-weight="bold"
          fill="#253C17"
        >
          GALLUS
        </text>
        <text
          x="75"
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
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav>
        <div>
          <div id="mySidenav" :class="['sidenav', { 'sidenav-open': isSidenavOpen }]">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
            <RouterLink to="/" class="nav-link">Gude</RouterLink>
            <RouterLink to="/" class="nav-link">Service</RouterLink>
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
  align-items: center;
  padding: 20px;
  color: lightskyblue;
  line-height: 1.5;

  .navbar-brand {
    width: 161.23;
    height: 125;
    display: flex;
    padding-right: 7px;
    justify-content: center;
    align-items: center;

    // display: block;
    // margin: 0 auto 2rem;
    svg {
      height: 30px;
    }
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
