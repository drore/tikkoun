<template>
  <div class="container">
    <div v-html="content"></div>
  </div>
</template>
<script>
export default {
  computed: {
    content() {
      return this.$store.state.content.htr
    }
  }
}
</script>

<style>
.tabContentTitle {
  text-decoration: underline;
  font-weight: bold;
  font-size: 18px;
}
</style>
