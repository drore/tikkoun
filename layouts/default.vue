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
      cache_buster: '1004'
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
    ga('create', 'UA-133908181-1')
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