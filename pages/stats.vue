<template>
  <div class="container">
    <div class="d-flex">
      <div class="p-2">
        <h4>{{$t('stats.leader_board')}}</h4>
        <b-table striped hover :items="leaders" class="leader-board"></b-table>
      </div>
      <div class="p-2">
        <h4>{{$t('stats.personal_stats')}}</h4>
        <UserStatsChart></UserStatsChart>
      </div>
    </div>
  </div>
</template>
<script>
import { StoreDB } from '~/plugins/firebase.js'
import UserStatsChart from '~/components/UserStatsChart'
export default {
  components: {
    UserStatsChart
  },
  computed: {
    leaders() {
      return this.$store.state.stats.leaders
    }
  },
  mounted() {
    this.$store.dispatch('stats/getLeaderBoard', { root: true })
  }
}
</script>
<style scoped lang="scss">

</style>
