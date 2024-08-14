<script setup lang="ts"></script>

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
