<template>
  <div>
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
  .start {
    cursor: pointer;
  }
  background-color: #e7f9f0;
  .range {
    background-color: orange;
    &.done {
      background-color: green;
      color: white;
    }
  }
  .task-info,
  .range {
    .title {
      font-weight: bold;
    }
    .desc {
    }
  }
}
.well-done{
  font-size:25px;

}
</style>