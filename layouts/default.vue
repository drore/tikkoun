<template>
  <div class="wrapper" v-bind:class="{ rtl: direction === 'rtl' }">
    <Topbar />
    <nuxt class="content flex-grow-1" />
  </div>
</template>
<script>
import Topbar from '~/components/Topbar'
export default {
  data() {
    return {
      cache_buster: '1015'
    }
  },
  components: {
    Topbar
  },
  computed: {
    direction() {
      return this.$t('dir')
    }
  },
  mounted() {
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
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  place-content: flex-start;
  max-height: 100vh;
  .content{
    flex-shrink: 1;
    max-height: inherit;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
   place-content: flex-start;
  }
}
</style>