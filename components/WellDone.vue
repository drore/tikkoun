<template>

  <div
    class="well-done"
    v-if="line && line.userLineData && line.userLineData.action && line.userLineData.action === 'done'"
  >
    {{$t('main.work_area.go_to_next_needed_line_1')}}
    <div>
      <a
        :href="localePath({name:'transcribe-manuscript-page-line'})"
      >{{$t('main.work_area.go_to_next_needed_line_2')}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['line']
}
</script>
<style lang="scss">
.well-done {
  background-color: #e9f9e9;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>