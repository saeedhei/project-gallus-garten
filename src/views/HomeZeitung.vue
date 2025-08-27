<template>
  <!-- Newsletter Section -->
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="relative overflow-hidden rounded-2xl newsletter-card p-8 md:p-12 shadow-lg">
        <!-- Leaf decorations -->
        <div
          class="leaf-decoration top-0 left-0 transform -translate-x-10 -translate-y-10 rotate-45"
        ></div>
        <div
          class="leaf-decoration bottom-0 right-0 transform translate-x-10 translate-y-10 rotate-225"
        ></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div class="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-garden-dark mb-4">GUDE!</h2>
            <p class="text-lg text-gray-700 mb-6">
              Hier finden Sie alle Nachrichten aus dem GallusGarten-Galluswarte.
            </p>
            <img
              src="/docs/zeitung.jpg"
              alt="Newsletter Beispiel"
              class="max-w-md w-full h-auto rounded-lg shadow-lg border-4 border-white mb-3"
            />
            <a
              href="/docs/zeitung.webp"
              class="inline-block bg-garden-green hover:bg-garden-dark text-white font-semibold px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-md text-center"
            >
              Newsletter ansehen
            </a>
          </div>

          <div class="lg:w-1/2 flex flex-col items-center">
            <div class="relative">
              <div
                class="w-64 h-64 bg-garden-light bg-opacity-20 rounded-full flex items-center justify-center mb-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-32 w-32 text-garden-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div class="absolute -bottom-4">
                <a
                  href="/newsletter-archiv"
                  class="inline-flex items-center px-6 py-3 bg-white border border-garden-green text-garden-green rounded-full font-medium hover:bg-garden-green hover:text-white transition duration-300 shadow-lg"
                >
                  <span>Zum Newsletter-Archiv</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <section class="px-2 py-10 bg-white md:px-0"> -->
  <!-- <div class="container items-center max-w-6xl px-8 mx-auto xl:px-20">
      <div class="flex flex-wrap items-center sm:-mx-3">
        <div class="w-full md:w-1/2 md:px-3">
          <div
            class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
          >
            <h1
              class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl"
            >
              <span class="block lg:inline leading-relaxed">Neujahrsgruß / </span>
              <span class="block text-lime-600 lg:inline leading-relaxed">Tätigkeitsbericht</span>
            </h1>
            <div class="h-auto overflow-hidden rounded-md sm:rounded-xl flex justify-begin">
              <img src="/docs/zeitung.jpg" class="object-cover w-1/2" />
            </div>
            <div class="w-full md:w-1/2 flex justify-center">
              <a
                href="/docs/zeitung.webp"
                class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-lime-600 rounded-md sm:mb-0 hover:bg-lime-700 sm:w-auto"
              >
                Herunterladen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 flex justify-center">
          <BarChart />
        </div>
      </div>
    </div> -->
  <!-- </section> -->
</template>

<script setup lang="ts">
// import BarChart from '../../organisms/chart-teils/BarChart.vue'
</script>

<style scoped lang="scss">
.newsletter-card {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
}
.newsletter-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.leaf-decoration {
  position: absolute;
  width: 100px;
  height: 100px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%232e7d32" d="M50,0 C70,20 90,40 100,60 C90,80 70,90 50,100 C30,90 10,80 0,60 C10,40 30,20 50,0 Z"/></svg>');
  background-size: contain;
  opacity: 0.2;
}
</style>
