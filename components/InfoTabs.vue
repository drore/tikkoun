<template>
  <b-tabs pills>
    <b-tab :title="$t('main.data_area.alphabet')" lazy>
      <div v-if="content.alphabet">
        <div v-html="content.alphabet"></div>
        <div v-html="content.alphabet_ms" v-if="content.alphabet_ms"></div>
        <div v-html="content.alphabet_similar" v-if="content.alphabet_similar"></div>
      </div>
    </b-tab>
    <b-tab :title="$t('main.data_area.special')" lazy>
      <div v-html="content.special" v-if="content.special"></div>
    </b-tab>
    <b-tab :title="$t('main.data_area.editing')" lazy>
      <div v-html="content.marked" v-if="content.marked"></div>
    </b-tab>
    <b-tab :title="$t('main.data_area.help')" lazy>
      <div v-html="content.help" v-if="content.help"></div>
    </b-tab>
  </b-tabs>
</template>
<script>
import Help from '~/components/Help'

export default {
  components: {
    Help
  },
  watch: {
    help_shown: function(shown) {
      if (this.$store.state.general.help_ui === 'popup') {
        if (shown) {
          this.$refs['modal-help'].show()
        } else {
          this.$refs['modal-help'].hide()
        }
      } else {
      }
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

.info_content {
  padding: 5px;
  text-align: justify;
}
.tabs {
  .nav {
    white-space: nowrap;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    flex: 0 0 auto;
    flex-wrap: nowrap;
    overflow-x: auto;
    .nav-item {
      font-size: 1.2rem;
    }
  }
}
.tab-content {
  overflow-y: auto;
  overflow-x: hidden;
  img {
    max-width: 100%;
  }
}
.info-page .flex-nowrap {
  overflow-x: auto;
  overflow-y: hidden;
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

        height: 40px;
      }
    }
  }
}
.line-info {
  direction: ltr;
  text-align: left;
  font-size: 12px;
  white-space: nowrap;
}
</style>
