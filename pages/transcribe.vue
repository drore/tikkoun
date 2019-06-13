<template>
  <div>
    <div
      class="task-announcement p-2"
      v-if="$store.state.transcribe.task"
      @click="changedUserTrancribeMode('tasks')"
    >{{$t('task.weekly-task')}} - {{$store.state.transcribe.task.name}} - <span v-if="$store.state.auth.user.transcribe_mode !== 'tasks'">{{$t('task.click_to_participate')}}</span></div>
    <nuxt-child v-if="manuscript"/>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      manuscriptRequested: false,
      motivational_message: ''
    }
  },
  beforeDestroy() {
    this.$store.dispatch('transcribe/clear')
  },
  mounted() {
    const routeParams = this.$route.params
    if (routeParams && routeParams.manuscript) {
      const routeManuscript = routeParams.manuscript.toLowerCase()
      const storeManuscript =
        this.$store.state.transcribe.manuscript &&
        this.$store.state.transcribe.manuscript.name &&
        this.$store.state.transcribe.manuscript.name.toLowerCase()

      if (routeManuscript === storeManuscript) {
        ////
      } else if (!this.manuscriptRequested) {
        this.manuscriptRequested = true
        this.$store.dispatch('transcribe/GET_MANUSCRIPT', routeManuscript)
      }
    } else if (!this.manuscriptRequested) {
      this.manuscriptRequested = true
      this.$store.dispatch('transcribe/GET_MANUSCRIPT')
    }
  },
  methods: {
    changedUserTrancribeMode(mode) {
      this.$store.dispatch('auth/changeTranscribeMode', mode).then(res => {
        setTimeout(function() {
          window.location.reload()
        }, 1000)
      })
    }
  },
  computed: {
    manuscript() {
      const manuscript = this.$store.state.transcribe.manuscript
      return manuscript
    }
  }
}
</script>
<style lang="scss">
.task-announcement {
  background-color: #87ffc3;
  cursor: pointer;
}
</style>