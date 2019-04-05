<template>
  <div class="row">
    <div class="sidebar col-3">
      <div class="accordion" id="sidebarAccordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >{{$t('general')}}</button>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
              <a href="javascript:;" @click="showInformationPane">{{$t('information')}}</a>
              <hr>
              <a href="javascript:;" @click="showHistoryPane">{{$t('history')}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content p-2">
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
  </div>
</template>
<script>
import { StoreDB } from '~/plugins/firebase.js'
export default {
  data() {
    return {}
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
    showInformationPane() {},
    showHistoryPane() {
      this.$store.dispatch('getUserLines', this.$store.state.auth.user.uid)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
