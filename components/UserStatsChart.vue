<template>
  <div>
    <Chart :options="chartOptions" :chartdata="chartData" v-if="chartData"></Chart>
  </div>
</template>
<script>
import Chart from '~/components/Chart'

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOptions: {
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'day'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },

  computed: {
    chartData() {
      const userStats = this.$store.state.stats.userStats
      const dailyStats = userStats.daily
      const colors = ['navy', 'grey']
      const data = { labels: [], datasets: [] }
      const dailyLablesArr = []
      let iterator = 0
      const self = this
      $.each(dailyStats, function(ms_id, stats) {
        // Each is a different manuscript
        const daily = []
        const dailyValuesArr = []
        // TODO: move to some kind of data service
        const manuscripts = self.$store.state.general.manuscripts
        const manuscript = manuscripts.find(m => {
          return m.id === ms_id
        })

        data.datasets[iterator] = {
          label: `Daily lines for ${manuscript.name}`,
          backgroundColor: colors[iterator]
        }

        $.each(stats, function(dStat, value) {
          dailyValuesArr.push({
            x: new Date(dStat),
            y: value
          })
        })

        data.datasets[iterator].data = dailyValuesArr
        iterator++
      })
      if (iterator) {
        return data
      }
    }
  }
}
</script>

<style>
</style>