<template>
  <div v-bind:class="{ rtl: direction === 'rtl' }">
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
    }
  },
  mounted() {
    ga('create', 'UA-133908181-1')
    this.$store.dispatch("general/getInitialData")
  }
}
</script>