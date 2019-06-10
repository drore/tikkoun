<template>
  <div :style="style">
    <Topbar/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import Topbar from '~/components/Topbar'
import Footer from '~/components/Footer'
export default {
  components: {
    Topbar,
    Footer
  },
  computed: {
    direction() {
      return this.$t('dir')
    },
    style() {
      let style = ''
      if (this.direction === 'rtl') {
        style = `direction:rtl;text-align:right`
      }

      return style
    }
  },
  mounted() {
    ga('create', 'UA-133908181-1')
    this.$store.dispatch("general/getInitialData")
  }
}
</script>