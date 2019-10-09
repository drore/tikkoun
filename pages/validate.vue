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
        <UserStatsChart></UserStatsChart>
      </div>
    </div>
  </div>
</template>
<script>
import { StoreDB } from '~/plugins/firebase.js'
import UserStatsChart from '~/components/UserStatsChart'
export default {
  data() {
    return {
      shown_pane: 'information'
    }
  },
  components: {
    UserStatsChart
  },
  computed: {
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
