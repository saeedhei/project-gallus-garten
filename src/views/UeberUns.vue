<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import HeaderShort from '../components/templates-layouts/headers/HeaderShort.vue'
import FooterView from '../components/templates-layouts/footers/FooterView.vue'

// Define a ref for the scrollable div
const contentLoaded = ref(false) // Track if content is loaded

// Function to scroll to the bottom of the div
function smoothScrollTo(targetPercentage: number, duration: number = 5000) {
  const targetScroll = document.documentElement.scrollHeight * targetPercentage
  const startScroll = window.scrollY
  const distance = targetScroll - startScroll
  const startTime = performance.now()

  const step = () => {
    const elapsedTime = performance.now() - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const scroll = startScroll + distance * progress
    window.scrollTo(0, scroll)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  step()
}

// Simulating an API call
async function fetchData() {
  // Simulate a delay for fetching data
  return new Promise((resolve) => {
    setTimeout(() => {
      contentLoaded.value = true // Indicate data has been loaded
      resolve(true)
    }, 1000) // Simulate 1 second delay
  })
}

onMounted(async () => {
  await fetchData() // Fetch the data
  await nextTick() // Wait for next DOM update cycle
  smoothScrollTo(0.74, 4000) // Scroll after the content has been loaded
})
</script>

<template>
    <HeaderShort/>
  <main>
    <div class="page container mx-auto px-4">
 
      <section class="py-8">
        <div class="timeline">
          <!-- Timeline item 2 -->
          <div class="timeline-item right">
            <div class="content">
              <h2>October 2024</h2>
              <h3>Selbstorganisation und vertragliche Pflichten</h3>
              <p>
                Interessierte Mitmenschen können als Hochbeet-Patinnen und -paten ab Februar für 12
                Monate die Verantwortung für ein Beet übernehmen. Sie erhalten Tipps und lernen
                Tricks für bis zu drei Ernten in einer Saison. Im Gegenzug leisten diese
                GärtnerInnen im GallusGarten II eine Pacht. Entweder in Form von Arbeitsstunden bei
                den vertraglichen Gemeinschaftsaufgaben (Wässern, Müll einsammeln,
                Rückschnitte/Grünpflege, …) und beim Neubau oder Reparatur von Hochbeeten. Oder
                falls dies zeitlich oder gesundheitlich nicht möglich ist als Spende auf das
                Vereinskonto.
              </p>
              <img src="https://via.placeholder.com/400x200" alt="August Event Image" />
            </div>
          </div>

          <!-- Timeline item 1 -->
          <div class="timeline-item left">
            <div class="content">
              <h2>Januar 2024</h2>
              <h3>Sensationelle Lage und Selbstorganisation</h3>
              <p>
                Unseren GallusGarten-Galluswarte gibt es nur weil wir dafür freiwillig arbeiten,
                also kostenfrei dieses Klimaprojekt in unzähligen Stunden auf- und weiter bauen.
                Damit täglich 25-40.000 Umsteigende an der Galluswarte auf diesen besonderen Ort in
                der Frankenallee schauen können. Oder sogar reinschauen, um zu sehen was wir hier
                vormachen, um anzuregen mitzumachen oder anderorts nachzumachen!
              </p>
              <img src="https://via.placeholder.com/400x200" alt="March Event Image" />
            </div>
          </div>

          <!-- Timeline item 2 -->
          <div class="timeline-item right">
            <div class="content">
              <h2>August 2023</h2>
              <h3>Eigener Trägerverein und amtliche Hilfe</h3>
              <p>
                Der Verein stellt die Hochbeete und übernimmt vertragliche Pflichten aus dem
                Nutzungsvertrag des Amtes für Straßenbau und Erschließung. Zuständiges Amt ist das
                Frankfurter Grünflächenamt, daß unter Simone Jacob und Felix Reischmann zu einer
                bundesweit beispielgebenden „Urban Gardening Beauftragen“ wurde. Was mit einzelnen
                Projekten mit städtischer Hilfe angeschoben wurde ist heute eine weiter wachsende
                Anzahl von Nachbarschaftsgärten und Klimaprojekten geworden. Das ist eine
                Erfolgsgeschichte von sehr unterschiedlichen Gärten und Klimapaten in den
                Frankfurter Stadtteilen: mit besonderen bis beispielhaften Schwerpunkten. Der
                politische Erfolg des aus der BürgerInnen-Initiative „Klimaentscheid“ hat viele
                Themen der GemeinschaftsgärtnerInnen gestärkt. Wir sind erst am Anfang, weil der
                Klimawandel schon heute Frankfurt zu den TOP 5 der heißesten Städte Deutschlands
                macht.
              </p>
              <img src="https://via.placeholder.com/400x200" alt="August Event Image" />
            </div>
          </div>

          <!-- Timeline item 1 -->
          <div class="timeline-item left">
            <div class="content">
              <h2>Feruar 2023</h2>
              <h3>Ein Anfang mit Unterstützung</h3>
              <p>
                Unsere „Mutter“ war der Gallusgarten des Mehrgenerationenhauses (Kinder im Zentrum
                e.V.), der als Trägerverein, die ersten 13 Monaten die notwendige juristische Person
                zum Aufbau des GallusGarten II darstellte. Am 9. Dezember 2021 gründeten deshalb
                zehn NachbarInnen den Trägerverein „GallusGarten II - Gemeinschaftsgarten an der
                Galluswarte“. (Satzung siehe Link).
              </p>
              <img src="https://via.placeholder.com/400x200" alt="March Event Image" />
            </div>
          </div>

          <!-- Timeline item 2 -->
          <div class="timeline-item right">
            <div class="content">
              <h2>April 2022</h2>
              <h3>Für die Menschen</h3>
              <p>
                Deshalb bauten wir neben Hochbeeten in unterschiedlichen Formen und Größen auch neue
                Sitzgelegenheiten für die von Covid-geplagten Mitmenschen. Kunstobjekte, wie das
                „Dach für den Garten“, die „12 Stämme“, die „schräge Parkbank“ und Sitzflächen in
                den Beetbuchten sind Teil dieser „sozialen Choreographie“ für Mensch, Flora und
                Fauna an der Frankenallee.
              </p>
              <img src="https://via.placeholder.com/400x200" alt="August Event Image" />
            </div>
          </div>

          <!-- Timeline item 1 -->
          <div class="timeline-item left">
            <div class="content">
              <h2>march 2022</h2>
              <h3>Für die Stadtnatur</h3>
              <p>
                Im Jul 2024 haben wir 5 Jahre bewegte Geschichte von Förderung des Natur-, Umwelt-
                und Klimaschutzes, sowie der Biodiversitätsbildung geschafft. Ein weiterer,
                wichtiger Gestaltungsgrund im GallusGarten II ist die Kunst + Ästhetik, damit der
                Garten nicht nur ein Experimentierfeld für Selbstversorgung ist. Sondern auch ein
                sinnlicher Raum der Anregung, Bewegung und Begegnung von Menschen in der Stadtnatur.
              </p>
              <img src="https://via.placeholder.com/400x200" alt="March Event Image" />
            </div>
          </div>

          <!-- Timeline item 2 -->
          <div class="timeline-item right">
            <div class="content">
              <h2>August 2021</h2>
              <h3>Hitzesommer als Auslöser</h3>
              <p>
                Auch weil 2018 und 2019 jeweils zwei Hitzesommer die Stadt, die Menschen und die
                Stadtnatur plagten. Da kommt ein zivilgesellschaftliches Projekt, wie ein
                Nachbarschaftsgarten gerade richtig gut an. Mit vielen Vorteilen für die Vielfalt in
                der Stadtnatur (über und unter dem Boden)der Frankenallee).
              </p>
              <img src="https://via.placeholder.com/400x200" alt="August Event Image" />
            </div>
          </div>

          <!-- Timeline item 3 -->
          <div class="timeline-item left">
            <div class="content">
              <h2>Juli 2019</h2>
              <h3>Wann alles begann?</h3>
              <p>
                Im Juli 2019 begann es mit drei blauen Kisten: der GallusGarten-Galluswarte. Zuvor
                hatten wir eine freundliche Zustimmung aus dem Grünflächenamt erhalten! Ein
                Gemeinschaftsgarten für die Nachbarschaft in der Frankenallee direkt in der
                Grünfläche an der Galluswarte? JA, das war und ist eine gute, unterstützenswerte
                Idee.
              </p>
              <img src="https://via.placeholder.com/400x200" alt="April Event Image" />
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Section -->
      <!-- <section class="py-8">
    </section> -->

      <!-- Row -->
      <!-- <div class="flex flex-wrap -mx-4">
      </div> -->

      <!-- Column 1 -->
      <!-- <div class="w-full md:w-1/2 lg:w-1/3 px-4">
          <div class="bg-white p-6 shadow-lg">
            <h2 class="text-xl font-bold mb-4">Feature 1</h2>
            <p class="text-gray-600">Description of feature 1.</p>
          </div>
        </div> -->

      <!-- Feature Section -->
      <section class="py-8">
        <!-- Row -->
        <div class="flex flex-wrap -mx-4">
          <!-- Column 2 -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
            <div class="bg-white p-6 shadow-lg">
              <h2 class="text-xl font-bold mb-4">Mission</h2>
              <p class="text-gray-600">Description of feature 2.</p>
            </div>
          </div>
          <!-- Column 3 -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
            <div class="bg-white p-6 shadow-lg">
              <h2 class="text-xl font-bold mb-4">Karriere</h2>
              <p class="text-gray-600">Description of feature 3.</p>
            </div>
          </div>
          <!-- Column 1 -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
            <router-link to="/ueber-uns/team" class="text-blue-500 hover:underline mr-4">
              <div class="bg-white p-6 shadow-lg">
                <h2 class="text-xl font-bold mb-4">Das Führungsteam</h2>
                <p class="text-gray-600">Description of feature 1.</p>
              </div>
            </router-link>
          </div>
          <!-- Column 3 -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
            <div class="bg-white p-6 shadow-lg">
              <h2 class="text-xl font-bold mb-4">Konferenzen und Meetups</h2>
              <p class="text-gray-600">Description of feature 3.</p>
            </div>
          </div>
          <!-- Column 3 -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
            <div class="bg-white p-6 shadow-lg">
              <h2 class="text-xl font-bold mb-4">Innovationen</h2>
              <p class="text-gray-600">Description of feature 3.</p>
            </div>
          </div>
          <!-- Column 3 -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
            <div class="bg-white p-6 shadow-lg">
              <h2 class="text-xl font-bold mb-4">Engagement für die Gemeinschaft</h2>
              <p class="text-gray-600">Description of feature 3.</p>
            </div>
          </div>
        </div>
        <!-- End of Row -->
      </section>
    </div>
  </main>
  <FooterView />
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
$timeline-color: #ff6347;

.page {
  font-family: 'Poppins', sans-serif;

  a {
    color: $timeline-color;
    text-decoration: none;
  }

  .timeline {
    pointer-events: none;
    position: relative;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px 0;

    &::after {
      content: '';
      position: absolute;
      width: 6px;
      background-color: $timeline-color;
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -3px;
    }

    .timeline-item {
      padding: 20px;
      position: relative;
      width: 50%;

      &.left {
        left: 0;
      }

      &.right {
        left: 50%;
      }

      &::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        right: -13px;
        background-color: $timeline-color;
        border-radius: 50%;
        top: 20px;
        z-index: 1;
      }

      &.right::after {
        left: -12px;
        right: auto;
      }

      .content {
        padding: 20px;
        background-color: white;
        position: relative;
        border-radius: 6px;

        h2 {
          font-size: 2em; /* 32px if the base font size is 16px */
          font-weight: bold; /* Makes the text bold */
          color: $timeline-color; /* Dark grey color for better readability */
          margin-bottom: 20px; /* Adds space below the heading */
          line-height: 1.2; /* Line height for good readability */
        }

        h3 {
          font-size: 1.75em; /* 28px if the base font size is 16px */
          font-weight: bold; /* Makes the text bold */
          color: #444444; /* Slightly lighter grey than h2 */
          margin-bottom: 15px; /* Adds space below the heading */
          line-height: 1.3; /* Improves spacing between lines */
        }

        p {
          font-size: 1em; /* Default 16px font size */
          color: #555555; /* A medium grey for readability */
          line-height: 1.6; /* Comfortable line height for reading */
          margin-bottom: 20px; /* Adds space between paragraphs */
        }

        img {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          margin-top: 15px;
        }

        &.left {
          text-align: right;
        }

        &.right {
          text-align: left;
        }
      }
    }

    /* Responsive */
    @media screen and (max-width: 768px) {
      &::after {
        left: 10px;
      }

      .timeline-item {
        width: 100%;
        padding-left: 70px;
        padding-right: 25px;

        &.right {
          left: 0;
        }

        &::after {
          left: 15px;
        }

        &.right::after {
          left: 15px;
        }

        .content {
          &.right {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
