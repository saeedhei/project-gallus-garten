<template>
  <div id="app">
    <!-- Wrapper for Form and Receipt -->
    <div class="container">
      <!-- Form Section (left side on large screens, top on small screens) -->
      <div class="form-section">
        <h2>Arbeitszeit und Vergütungsdetails</h2>
        <div class="form">
          <div>
            <label for="name">Arbeitnehmer:</label>
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
            <label for="task">Tätigkeit:</label>
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
          <h1 class="title">Arbeitszeit- und Vergütungsquittung</h1>
          <div class="header">
            <p>Gallusgarten e.V. | Musterstraße 123 | Frankfurt am Main | Tel: 069-1234567</p>
          </div>
          <div class="details">
            <div>
              <label>Arbeitnehmer:</label>
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
                <th>Tätigkeit</th>
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
              <p>Unterschrift Arbeitnehmer</p>
              <hr />
            </div>
            <div>
              <p>Unterschrift Arbeitgeber</p>
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

// Reactive fields
const employeeName = ref<string>('Max Mustermann')
const employeeAddress = ref<string>('Musterweg 45, 60326 Frankfurt am Main')
const date = ref<string>('2024-12-08')
const workTime = ref<string>('09:00–12:00')
const task = ref<string>('Gartenpflege')
const hours = ref<number>(3)
const hourlyRate = ref<number>(10)
const payoutDate = ref<string>('2024-12-08')

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
