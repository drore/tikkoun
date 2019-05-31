<template>
  <div class="row">
    <div class="sidebar col-3">
      <div>
        <a href="javascript:;" @click="showPane('information')">{{$t('profile.general')}}</a>
      </div>
      <div>
        <a href="javascript:;" @click="showPane('stats')">{{$t('profile.stats')}}</a>
      </div>
    </div>
    <div class="content p-2">
      <div class="pane information" v-if="shown_pane === 'information'">
        <div class="edit-user-information">
          <div class="field">
            <label for="lang">
              {{$t('displayName')}}:
              <input type="text" v-model="user.displayName">
            </label>
          </div>

          <a href="javascript:;" @click="updateUserInformation">{{$t('update')}}</a>
        </div>
      </div>
      <div class="pane stats" v-if="shown_pane === 'stats'">
        <Chart :options="chartOptions" :chartdata="chartData" v-if="chartData"></Chart>
      </div>
    </div>
  </div>
</template>
<script>
import { StoreDB } from '~/plugins/firebase.js'
import Chart from '~/components/Chart'
export default {
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
      },
      shown_pane: 'information'
    }
  },
  components: {
    Chart
  },
  computed: {
    chartData() {
      const userStats = this.$store.state.stats.userStats
      const dailyStats = userStats.daily
      const colors = ['navy', 'grey']
      const data = { labels: [], datasets: [] }
      const dailyLablesArr = []
      let iterator = 0
      $.each(dailyStats, function(ms_id, stats) {
        // Each is a different manuscript
        const daily = []
        const dailyValuesArr = []

        data.datasets[iterator] = {
          label: `Daily lines for ${ms_id}`,
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
    },

    user() {
      const user = {}
      user.displayName = this.$store.state.auth.user.displayName
      return user
    },
    userLines() {
      return this.$store.state.auth.user.userLines
    }
  },
  methods: {
    updateUserInformation() {},
    showPane(pane) {
      this.shown_pane = pane
      if (pane === 'stats') {
        this.getUserDailyMSStats()
      }
    },
    getUserDailyMSStats() {
      this.$store.dispatch('stats/getUserDailyMSStats', {
        uid: this.$store.state.auth.user.uid
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
