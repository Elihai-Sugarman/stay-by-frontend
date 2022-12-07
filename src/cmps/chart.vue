<template>
    <BarChart v-if="chartType === 'bar'" :chartData="data" :options="options" />
    <DoughnutChart v-if="chartType === 'doughnut'" :chartData="data" />
</template>
  
  <script>
  import { BarChart } from 'vue-chart-3'
  import { DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  export default {
    name: 'chart',
    props: {
      data: Object,
      chartType: String,
    },
    created(){
      console.log('chart type', this.chartType);
    },

    components: { BarChart, DoughnutChart },
    data() {
      return {
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      }
    },
  }
  </script>
  