<template>
  <div class="chart-container">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = ref(chartConfig.data)
const options = ref(chartConfig.options)
</script>

<style scoped>
.chart-container {
  width: 90%;
}
</style>

<!-- <script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Pie
  },
  data() {
    return chartConfig
  }
}
</script> -->
