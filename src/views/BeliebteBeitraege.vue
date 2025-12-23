<template>
  <section class="mx-auto px-4 py-12 flex flex-col justify-center min-h-screen md:min-h-0">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Neuer Beitrag</h2>

    <!-- Featured Post -->
    <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
      <!-- Image Wrapper - Improved -->
      <div class="w-full md:w-5/12 flex justify-center">
        <div class="relative w-full max-w-lg aspect-w-16 aspect-h-9 md:aspect-none">
          <img
            src="/images/beliebte-beitrag/winterferst-27.12.2025.webp"
            alt="Winterfest Highlight"
            class="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="w-full md:w-7/12">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Winterfest im Gallus</h2>

        <p class="text-lg leading-relaxed mb-4 text-slate-800">
          Am <span class="font-semibold">27. &amp; 28.12.2025</span> laden wir zum ersten
          <span class="font-semibold">Winterfest im Gallus</span> an der
          <span class="font-semibold">Galluswarte</span> ein. Auf dem Gelände
          <span class="font-semibold">Frankenallee 99</span>
          entsteht ein offener Begegnungsort mit Lagerfeuer, Musik und Gesprächen – für alle, die
          über die Feiertage in Gallus bleiben.
        </p>

        <p class="text-lg leading-relaxed mb-4 text-slate-700">
          Im Mittelpunkt steht unsere Umfrage
          <span class="font-semibold">„Wie geht’s Gallus?“</span>. Wir sammeln Geschichten,
          Eindrücke und Portraits aus dem Stadtteil und schaffen Raum für Zuhören, Austausch und
          gemeinsames Erleben.
        </p>

        <p class="text-base text-slate-700 mb-6">
          <span class="font-semibold">Programm:</span>
          Lagerfeuer, Musik, Iglu-Workshop, Fahrradwerkstatt, Suppen &amp; Kuchen, Spiel- und
          Gesprächszelte für Groß und Klein.
        </p>
        <p class="text-sm text-slate-700 mb-6 pt-5">
          Die Veröffentlichung stellt keine Meinungsäußerung des BMFSFJ oder des BAFzA dar. Für
          inhaltliche Aussagen tragen die Autorinnen und Autoren die Verantwortung.
        </p>
        <div class="text-center py-6 text-sm text-gray-600 border-t mt-12">
          <p>
            Gefördert durch das Bundesprogramm
            <a
              href="https://www.demokratie-leben.de/"
              target="_blank"
              class="font-semibold text-blue-600 hover:underline"
            >
              „Demokratie leben!“
            </a>
            des Bundesministeriums für Familie, Senioren, Frauen und Jugend (BMFSFJ).
          </p>
          <p class="mt-2">
            <a
              href="https://www.demokratie-leben.de/"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              www.demokratie-leben.de
            </a>
          </p>
        </div>
        <div
          class="inline-block bg-slate-900 text-white font-semibold px-5 py-3 rounded-xl shadow-md mb-4"
        >
          📍 27./28.12. | 13–17 Uhr
        </div>
        <div>
          <RouterLink
            to="/beitraege/1"
            class="inline-flex items-center font-medium text-blue-600 hover:underline"
          >
            Mehr lesen
            <span class="ml-1">→</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center mt-12">
      <RouterLink
        to="/beitraege"
        class="inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition"
      >
        Alle Beiträge anzeigen
      </RouterLink>
    </div>
  </section>
</template>
