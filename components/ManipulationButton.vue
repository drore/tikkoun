<template>
  <button :title="$t(title)" class="btn btn-tikkoun btn-sm" type="button" @click="manipulateLine">
    <span style="font-size: larger;" v-if="content">{{$t(content)}}</span>
    <span style="font-size: larger;" v-if="t_content">{{t_content}}</span>
  </button>
</template>
<script>
export default {
  props: ['title', 'action', 'content', 't_content'],
  methods: {
    manipulateLine() {
      this.$store
        .dispatch('transcribe/manipulateLine', this.action)
        .then(() => {
          const cursorLocation = this.$store.state.transcribe.selected_line
            .selected_range.end

          const inputElem = document.getElementById('trw')
          inputElem.focus()
          inputElem.setSelectionRange(cursorLocation+1, cursorLocation+1)
        })
    }
  }
}
</script>
<style>
</style>

