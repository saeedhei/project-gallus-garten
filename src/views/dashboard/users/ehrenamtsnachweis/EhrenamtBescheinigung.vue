<template>
  <div
    id="pdfContent"
    ref="pdfContent"
    class="max-w-3xl mx-auto p-6 rounded shadow bg-white text-gray-800 leading-relaxed text-[16px] font-serif"
  >
    <!-- هدر با لوگو و اطلاعات -->
    <div class="flex justify-between items-start mb-6">
      <img
        class="w-24 h-auto sm:w-32 lg:w-48"
        src="/images/GallusGarten.png"
        alt="Gallus Garten Logo"
      />
      <div class="text-sm">
        <p><strong>GallusGarten II</strong> – Gemeinschaftsgarten an der Galluswarte gem. e.V.</p>
        <p>mail: GallusGarten-Galluswarte@web.de</p>
        <p>mobil: 0160 763 9909</p>
        <p>Postadresse: ℅ Ralf Harth, Pariser Straße 42 - 60486 FFM</p>
        <p class="mt-2">31.07.25</p>
      </div>
    </div>

    <h1 class="text-xl font-bold mb-4">Bescheinigung einer ehrenamtlichen Tätigkeit</h1>

    <p>
      Hiermit bestätigen wir, dass Herr <strong>{{ userName }}</strong
      >, wohnhaft in der <strong>{{ userAddress }}</strong
      >, seit dem <strong>23.09.2023</strong> als aktives Mitglied unseres gemeinnützigen Vereins
      <strong>GallusGarten II – Gemeinschaftsgarten an der Galluswarte gem. e.V.</strong>
      ehrenamtlich tätig ist.
    </p>

    <div class="mt-8">
      <p>Mit freundlichen Grüßen</p>
      <p class="mt-10 font-bold">Ralf Harth</p>
      <p>Vorsitzender</p>
      <p>GallusGarten II – Gemeinschaftsgarten an der Galluswarte gem. e.V.</p>
    </div>

    <!-- دکمه خروجی PDF -->
    <div class="mt-10 text-center no-print">
      <button
        @click="downloadPdf"
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        PDF herunterladen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useRoute } from 'vue-router';

const route = useRoute();
const userName = ref('');
const userAddress = ref('');

onMounted(() => {
  if (route.query.name) {
    userName.value = route.query.name as string;
  }
  if (route.query.address) {
    userAddress.value = route.query.address as string;
  }
});

const pdfContent = ref<HTMLElement | null>(null);

const downloadPdf = async () => {
  if (!pdfContent.value) return;

  try {
    // 1. Clone the element to modify styles temporarily
    const element = pdfContent.value.cloneNode(true) as HTMLElement;
    document.body.appendChild(element);
    element.style.position = 'absolute';
    element.style.left = '-9999px';

    // ✅ Hide .no-print elements
    const noPrintElements = element.querySelectorAll('.no-print');
    noPrintElements.forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });

    // 2. Replace unsupported CSS colors
    const unsupportedColors = [
      { search: 'oklch(', replace: 'rgb(' },
      // Add other unsupported color formats if needed
    ];

    unsupportedColors.forEach(({ search, replace }) => {
      element.innerHTML = element.innerHTML.replaceAll(search, replace);
    });

    // 3. Generate PDF
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
    });

    document.body.removeChild(element);

    // 4. Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth() - 20; // 10mm margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(canvas, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('Ehrenamtliche_Bescheinigung.pdf');
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('PDF generation failed. Please try again or contact support.');
  }
};
</script>

<style scoped>
#pdfContent {
  font-family: Georgia, serif;
}
/* Replace oklch() with standard colors */
.max-w-3xl {
  max-width: 48rem;
  color: #333333; /* Replaced oklch() */
  background-color: #ffffff;
}

/* Ensure all colors use supported formats */
.text-gray-800 {
  color: #333333 !important;
}

.bg-green-600 {
  background-color: #16a34a !important;
}

.hover\:bg-green-700:hover {
  background-color: #15803d !important;
}

/* Print styles */
@media print {
  body * {
    visibility: hidden;
  }
  #pdf-content,
  #pdf-content * {
    visibility: visible;
  }
  #pdf-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
