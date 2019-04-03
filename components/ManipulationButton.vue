<template>
  <button
    :title="$t(title)"
    class="btn btn-secondary  btn-sm"
    type="button"
    @click="manipulateLine"
  >
    <span style="font-size: larger;">{{$t(content)}}</span>
  </button>
</template>
<script>
export default {
  props: ['title', 'action', 'content'],
  methods: {
    manipulateLine() {
      this.$store.dispatch('manipulateLine', this.action)
    }
  }
}
</script>
<style>
</style>

