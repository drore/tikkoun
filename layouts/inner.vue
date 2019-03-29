<template>
  <div>
    <Topbar />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Topbar from '~/components/Topbar'
import Footer from '~/components/Footer'
export default {
  components: {
    Topbar,
    Footer
  }
}
</script>
