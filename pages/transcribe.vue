<template>
  <div>
    <nuxt-child v-if="manuscript"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      manuscriptRequested: false
    }
  },
  mounted() {
    const routeParams = this.$route.params

    // if(this.$store.state.auth.user.transcribe_mode == "tasks"){
    //   this.$store.dispatch('transcribe/GET_TASK')
    // }

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
