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
  data() {
    return {
      cache_buster: '1010'
    }
  },
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
    const new_interface = localStorage.getItem('new_interface')
    if (new_interface) {
      console.log("navigate to new interface")
      window.location.replace('https://tikkoun-demo.firebaseapp.com')
    }
    // Check the cache buster - if It's different then the one on the localStorage, remove all localStorage
    const cacheBuster = localStorage.getItem('cache_buster')
    if (cacheBuster && cacheBuster != this.cache_buster) {
      localStorage.clear()
    }

    localStorage.setItem('cache_buster', this.cache_buster)

    this.$store.dispatch('general/getInitialData')
  }
}
</script>