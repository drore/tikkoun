<template>
  <div>
    <b-modal ref="modal-help" id="modal-help" :title="$t('help')" centered scrollable ok-only>
      <div class="d-flex justify-content-between" v-if="!$store.state.general.help_section">
        <div
          class="help-item"
          @click="showHelpSection('alphabet')"
        >{{$t('main.data_area.alphabet')}}</div>
        <div class="help-item" @click="showHelpSection('special')">{{$t('main.data_area.special')}}</div>
        <div class="help-item" @click="showHelpSection('editing')">{{$t('main.data_area.editing')}}</div>
        <div class="help-item" @click="showHelpSection('help')">{{$t('main.data_area.help')}}</div>
      </div>
      <div v-if="$store.state.general.help_section">
        <div @click="showHelpSection()">{{$t('nav.back')}}</div>
        <div
          v-html="content.special"
          v-if="content.special && $store.state.general.help_section === 'special'"
        ></div>
        <div
          v-html="content.alphabet"
          v-if="content.alphabet && $store.state.general.help_section === 'alphabet'"
        ></div>
        <div
          v-html="content.marked"
          v-if="content.marked && $store.state.general.help_section === 'editing'"
        ></div>
        <div
          v-html="content.help"
          v-if="content.help && $store.state.general.help_section === 'help'"
        ></div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  methods: {
    showHelpSection(section) {
      this.$store.dispatch('general/showHelpSection', section)
    }
  },
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
  }
}
</script>
<style lang="scss">
.tab-content {
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-tabs {
  padding: 0;
  .help-item {
    font-size: 0.8rem;
  }
}
.info-page .flex-nowrap {
  overflow-x: auto;
  overflow-y: hidden;
}
@media (min-width: 500px) {
  body {
    .tab-content {
      width: 450px;
    }
  }
}
@media (min-width: 768px) {
  body {
    .tab-content {
      width: 250px;
    }
  }
}
@media (min-width: 1100px) {
  body {
    .tab-content {
      width: 350px;
    }
  }
}
@media (min-width: 1280px) {
  body {
    .tab-content {
      width: 450px;
    }
  }
}

.info_content {
  .header {
    font-weight: bold;
    .title {
      font-size: 1.2rem;
    }
  }
  & > .content {
    & > div {
      margin-top: 5px;
    }
  }
}

.letters-table {
  width: 100%;
  direction: rtl;
  tr {
    td {
      border: 1px solid #333;
      text-align: center;
      img {
        margin: 0;
        max-height: none;
        height: 100%;
      }
    }
  }
}
.help-item {
  border-radius: 50%;
  padding: 20px;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
