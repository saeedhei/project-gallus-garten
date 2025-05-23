<template>
  <div id="app">
    <!-- Wrapper for Form and Receipt -->
    <div class="container">
      <!-- Form Section (left side on large screens, top on small screens) -->
      <div class="form-section">
        <h2 class="text-xl pb-2">Aufwand und Vergütungsdetails</h2>
        <div class="form">
          <div>
            <label for="name">Arbeitnehmer/ID:</label>
            <input id="name" type="text" v-model="employeeName" placeholder="Name eingeben" />
          </div>
          <div>
            <label for="address">Adresse:</label>
            <input
              id="address"
              type="text"
              v-model="employeeAddress"
              placeholder="Adresse eingeben"
            />
          </div>
          <div>
            <label for="date">Datum:</label>
            <input id="date" type="date" v-model="date" />
          </div>
          <div>
            <label for="workTime">Arbeitszeit:</label>
            <input id="workTime" type="text" v-model="workTime" placeholder="z.B. 09:00–12:00" />
          </div>
          <div>
            <label for="task">Tätigkeit / Einzelmaßnahmen:</label>
            <input id="task" type="text" v-model="task" placeholder="Tätigkeit eingeben" />
          </div>
          <div>
            <label for="hours">Stundenanzahl:</label>
            <input
              id="hours"
              type="number"
              v-model.number="hours"
              placeholder="Anzahl der Stunden"
            />
          </div>
          <div>
            <label for="hourlyRate">Stundensatz (€):</label>
            <input
              id="hourlyRate"
              type="number"
              v-model.number="hourlyRate"
              placeholder="Stundensatz"
            />
          </div>
          <div>
            <label for="payoutDate">Auszahlungsdatum:</label>
            <input id="payoutDate" type="date" v-model="payoutDate" />
          </div>

          <p class="text-xl pt-2">Unterschrift Auftragnehmer:</p>
          <VueSignaturePad
            ref="auftragnehmerSignature"
            height="400px"
            width="950px"
            :max-width="options.maxWidth"
            :min-width="options.minWidth"
            :options="options"
          />
          <div class="inline-flex">
            <button
              @click="saveAuftragnehmerSignature"
              class="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded-l"
            >
              Speichern
            </button>
            <button
              @click="clearAuftragnehmerSignature"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Löschen
            </button>
          </div>

          <p class="text-xl pt-2">Unterschrift Auftraggeber:</p>
          <VueSignaturePad
            ref="auftraggeberSignature"
            height="400px"
            width="950px"
            :max-width="options.maxWidth"
            :min-width="options.minWidth"
            :options="options"
          />
          <div class="inline-flex">
            <button
              @click="saveAuftraggeberSignature"
              class="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded-l"
            >
              Speichern
            </button>
            <button
              @click="clearAuftraggeberSignature"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Löschen
            </button>
          </div>

          <!-- Buttons -->
          <div class="buttons">
            <button @click="printReceipt">Drucken</button>
            <button @click="saveAsPDF">Als PDF speichern</button>
          </div>
        </div>
      </div>

      <!-- Receipt Section (right side on large screens, bottom on small screens) -->
      <div class="receipt-section">
        <div ref="receipt" class="receipt">
          <div class="flex items-center space-x-4">
            <img src="/gallus-garten/gg-logo.png" alt="Logo" class="w-28 h-22" />
            <h1 class="title text-2xl font-bold">Aufwand- und Entschädigungsquittung</h1>
          </div>
          <div class="header">
            <p>GallusGarten II - Gemeinschaftsgarten an der Galluswarte gem. e.V.</p>
            <p>
              Postadresse: Ralf Harth, Pariser Straße 42 - 60486 Frankfurt am Main | Tel: 0160 763
              99 09
            </p>
            <p>Spendenkonto: IBAN: DE30 5019 0000 6002 1732 53 bei der Frankfurter Volksbank eG</p>
          </div>
          <div class="details">
            <div>
              <label>Auftragnehmer:</label>
              <span>{{ employeeName }}</span>
            </div>
            <div>
              <label>Adresse:</label>
              <span>{{ employeeAddress }}</span>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Arbeitszeit</th>
                <th>Tätigkeit /<br />Einzelmaßnahmen</th>
                <th>Stundenanzahl</th>
                <th>Stundensatz (€)</th>
                <th>Gesamtbetrag (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ date }}</td>
                <td>{{ workTime }}</td>
                <td>{{ task }}</td>
                <td>{{ hours }}</td>
                <td>{{ hourlyRate }}</td>
                <td>{{ totalAmount }}</td>
              </tr>
            </tbody>
          </table>
          <div class="summary">
            <p><strong>Gesamtbetrag:</strong> {{ totalAmount }} €</p>
            <p><strong>Auszahlungsdatum:</strong> {{ payoutDate }}</p>
          </div>
          <div class="signatures">
            <div>
              <img
                v-if="auftragnehmerSignatureImage"
                :src="auftragnehmerSignatureImage"
                alt="Unterschrift Auftragnehmer"
              />
              <p>Unterschrift Auftragnehmer</p>
              <hr />
            </div>
            <div>
              <img
                v-if="auftraggeberSignatureImage"
                :src="auftraggeberSignatureImage"
                alt="Unterschrift Auftragnehmer"
              />
              <p>Unterschrift Auftraggeber</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import jsPDF from 'jspdf'
import { VueSignaturePad } from '@selemondev/vue3-signature-pad'

// Signatur-Pads
const auftragnehmerSignature = ref<InstanceType<typeof VueSignaturePad> | null>(null)
const auftraggeberSignature = ref<InstanceType<typeof VueSignaturePad> | null>(null)

// Gespeicherte Unterschriften als Base64-Bild
const auftragnehmerSignatureImage = ref<string | null>(null)
const auftraggeberSignatureImage = ref<string | null>(null)

// Speichern der Unterschrift
const saveAuftragnehmerSignature = () => {
  if (auftragnehmerSignature.value) {
    auftragnehmerSignatureImage.value = auftragnehmerSignature.value.saveSignature()
  }
}

const saveAuftraggeberSignature = () => {
  if (auftraggeberSignature.value) {
    auftraggeberSignatureImage.value = auftraggeberSignature.value.saveSignature()
  }
}

const clearAuftragnehmerSignature = () => {
  auftragnehmerSignature.value?.clearCanvas()
}

const clearAuftraggeberSignature = () => {
  auftraggeberSignature.value?.clearCanvas()
}

const options = ref({
  penColor: 'rgb(43,44,124)',
  backgroundColor: 'rgb(255, 255, 255)',
  maxWidth: 1,
  minWidth: 1,
})

// Reactive fields
const employeeName = ref<string>('Max Mustermann')
const employeeAddress = ref<string>('Musterweg 45, 60326 Frankfurt am Main')
const date = ref<string>('2025-03-08')
const workTime = ref<string>('09:00–12:00')
const task = ref<string>('Gartenpflege')
const hours = ref<number>(3)
const hourlyRate = ref<number>(10)
const payoutDate = ref<string>('2025-03-08')

// Computed field for total amount
const totalAmount = computed(() => hours.value * hourlyRate.value)

// Print functionality
const printReceipt = (): void => {
  window.print()
}

// Save as PDF functionality
const saveAsPDF = (): void => {
  const doc = new jsPDF('p', 'mm', [1630, 2280])

  const receiptElement = document.querySelector('.receipt') as HTMLElement

  if (receiptElement) {
    // Use the html method to add the receipt content, with auto pagination
    doc.html(receiptElement, {
      callback: (doc: jsPDF) => {
        doc.save('Arbeitszeit-Quittung.pdf')
      },
      x: 20,
      y: 20,
      width: 190, // Max width for content (should be less than 210mm for A4 paper)
      // windowWidth: document.body.scrollWidth, // Dynamically adjust based on the content width
      // autoPaging: true, // This ensures content is split over multiple pages if necessary
      html2canvas: {
        scale: 2, // Use a higher scale factor for better resolution
      },
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
#app {
  font-family: Arial, sans-serif;
  margin: 20px;
}

/* Wrapper for Form and Receipt */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Form Section */
.form-section {
  flex: 1;
  margin-right: 20px;
  min-width: 300px;
}

.form h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form div {
  margin-bottom: 12px;
}

.form label {
  font-weight: bold;
  margin-right: 10px;
}

.form input {
  padding: 10px;
  width: 100%;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.buttons {
  text-align: center;
  margin-top: 20px;
}

.buttons button {
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  border: none;
}

.buttons button:hover {
  background-color: #45a049;
}

/* Receipt Section */
.receipt-section {
  flex: 1;
  min-width: 300px;
  font-family: 'Poppins', sans-serif;
}

.receipt {
  border: 1px solid #ddd;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

.header {
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
  color: #555;
}

.details {
  margin-bottom: 20px;
}

.details div {
  margin-bottom: 10px;
}

.details label {
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.summary {
  margin-bottom: 20px;
}

.signatures {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.signatures div {
  width: 45%;
  text-align: center;
}

hr {
  border: none;
  border-top: 2px solid #000;
  width: 50%;
  margin: 10px auto;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .form-section,
  .receipt-section {
    width: 100%;
    margin-bottom: 20px;
  }

  .buttons {
    margin-top: 20px;
  }
}

@media print {
  .form-section {
    display: none;
  }
}
</style>
