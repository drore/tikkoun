<template>
  <div>
    <div v-if="!$store.state.general.help_section">
      <div class="d-flex justify-content-between mb-2">
        <div
          class="help-item"
          @click="showHelpSection('alphabet')"
        >{{$t('main.data_area.alphabet')}}</div>
        <div class="help-item" @click="showHelpSection('special')">{{$t('main.data_area.special')}}</div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="help-item" @click="showHelpSection('editing')">{{$t('main.data_area.editing')}}</div>
        <div class="help-item" @click="showHelpSection('help')">{{$t('main.data_area.help')}}</div>
      </div>
    </div>
    <div v-if="$store.state.general.help_section">
      <div
        v-html="content.special"
        v-if="content.special && $store.state.general.help_section === 'special'"
      ></div>
      <div v-if="content.alphabet && $store.state.general.help_section === 'alphabet' ">
        <div v-html="content.alphabet"></div>
        <div class="d-flex justify-content-between" v-if="!$store.state.general.help_sub_section">
          <div
            class="help-item"
            @click="showHelpSection('alphabet__alphabet_ms')"
          >{{$t('manuscript_ab')}}</div>
          <div
            class="help-item"
            @click="showHelpSection('alphabet__alphabet_similar')"
          >{{$t('similar_letters')}}</div>
        </div>
        <div
          v-html="content.alphabet_ms"
          v-if="content.alphabet_ms && $store.state.general.help_sub_section === 'alphabet_ms'"
        ></div>
        <div
          v-html="content.alphabet_similar"
          v-if="content.alphabet_similar && $store.state.general.help_sub_section === 'alphabet_similar'"
        ></div>
      </div>
      <div
        v-html="content.marked"
        v-if="content.marked && $store.state.general.help_section === 'editing'"
      ></div>
      <div
        v-html="content.help"
        v-if="content.help && $store.state.general.help_section === 'help'"
      ></div>
    </div>
    <div>
      <b-button
        variant="primary"
        @click="back()"
        v-if="$store.state.general.help_section"
      >{{$t('nav.back')}}</b-button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    content() {
      const content = {}
      if (this.$store.state.content.manuscript_content.length) {
        this.$store.state.content.manuscript_content.forEach(i => {
          content[i.token] = i.value
        })
      }

      return content
    },
    manuscript() {
      return this.$store.state.transcribe.manuscript
    },
    line() {
      return this.$store.state.transcribe.selected_line
    }
  },
  methods: {
    showHelpSection(section) {
      this.$store.dispatch('general/showHelpSection', section)
    },
    back() {
      let section = null
      if (this.$store.state.general.help_sub_section) {
        section = this.$store.state.general.help_section
      }

      this.$store.dispatch('general/showHelpSection', section)
    }
  }
}
</script>

<style>
</style>