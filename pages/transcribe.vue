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
    if (routeParams && routeParams.manuscript) {
      const routeManuscript = routeParams.manuscript.toLowerCase()
      const storeManuscript =
        this.$store.state.transcribe.manuscript &&
        this.$store.state.transcribe.manuscript.name &&
        this.$store.state.transcribe.manuscript.name.toLowerCase()

      if (routeManuscript === storeManuscript) {
        debugger;
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
      return this.$store.state.transcribe.manuscript
    }
  }
}
</script>
