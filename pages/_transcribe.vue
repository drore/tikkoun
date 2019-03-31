<template>
  <nuxt-child v-if="manuscript"/>
</template>
<script>
export default {
  data() {
    return {
      manuscriptRequested: false
    }
  },
  computed: {
    manuscript() {
      const routeParams = this.$route.params
      if (routeParams && routeParams.manuscript) {
        const routeManuscript = routeParams.manuscript.toLowerCase()
        const storeManuscript =
          this.$store.state.manuscript &&
          this.$store.state.manuscript.name &&
          this.$store.state.manuscript.name.toLowerCase()

        if (routeManuscript === storeManuscript) {
          return this.$store.state.manuscript
        } else if (!this.manuscriptRequested) {
          this.manuscriptRequested = true
          this.$store.dispatch('GET_MANUSCRIPT', routeManuscript)
          return null
        }
      } else if (!this.manuscriptRequested) {
        this.manuscriptRequested = true
        this.$store.dispatch('GET_MANUSCRIPT')
        return null
      }
      else{
        return this.$store.state.manuscript
      }
    }
  }
}
</script>
