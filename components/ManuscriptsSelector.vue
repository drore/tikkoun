<template>
  <div class="manuscripts" v-if="$store.state.transcribe.showManuscriptSelector">
    <ManuscriptThumb :manuscript="manuscript" v-for="(manuscript,i) in manuscripts" :key="i" />
  </div>
</template>

<script>
import axios from 'axios'
import ManuscriptThumb from '~/components/ManuscriptThumb'
export default {
  components: {
    ManuscriptThumb
  },
  methods: {
    closeManuscriptsSelector() {
      this.$store.dispatch('transcribe/closeManuscriptsSelector')
    }
  },
  computed: {
    manuscripts() {
      const _manuscripts = this.$store.state.general.manuscripts.concat([])
      _manuscripts.sort((a,b) => {
        return (a.doneLines.transcription / a.total_lines) - (b.doneLines.transcription / b.total_lines)
      })

      return _manuscripts.filter(m => {
        return !m.hidden
      })
    }
  }
}
</script>

<style lang="scss">
.manuscripts {
  overflow-y: auto;
  padding: 0 0.5rem;
  min-width: 11rem;
}
</style>
