<template>
  <section class="chart">
    <BarChart v-if="chartType === 'bar'" :chartData="data" :options="options" />
    <DoughnutChart v-if="chartType === 'doughnut'" :chartData="data" :options="pieOptions"/>
    <PieChart v-if="chartType === 'pie'" :chartData="data" :options="pieOptions"/>
  </section>
</template>

<script>
import { BarChart } from 'vue-chart-3'
import { DoughnutChart } from 'vue-chart-3'
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'chart',
  props: {
    data: Object,
    chartType: String,
  },
  components: { BarChart, DoughnutChart, PieChart },
  data() {
    return {
      Chart: {
        overrides: {
          Pie: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              },
            },
          },
        },
      },
      options: {
        plugins: {
          legend: {
            display: false,
            font: {
              size: 24
            }
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 16
              }
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
      pieOptions: {
        plugins: {
          legend: {
            // display: false,
            position: 'left',
            // fullSize: true,
            maxWidth: 300,
            labels: {
              // boxWidth: 20,
              // boxHeight: 20,
              font: {
                size: 16
              },
              usePointStyle: true,
              pointStyle: 'rectRounded'
            }
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    }
  },
}
</script>
