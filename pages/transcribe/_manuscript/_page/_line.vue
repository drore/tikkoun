<template>
  <div class="transcribe-page d-flex flex-grow-1">
    <HelpSection />
    <main class="d-flex flex-fill flex-column">
      <div class="flex-fill container-fluid h-100">
        <b-row class="h-100">
          <b-col md="8" id="work-page" class="p-2">
            <MSBreadcrumbs class="mb-2" />
            <WellDone :line="line" />
            <TranscriptionLine :line="line" />
          </b-col>
          <b-col md="4" class="p-2" style="background-color:black;">
            
            <TranscriptionMap />
          </b-col>
        </b-row>
      </div>
    </main>
  </div>
</template>

<script>
import WellDone from '~/components/WellDone'
import HelpSection from '~/components/HelpSection'
import TranscriptionIntro from '~/components/TranscriptionIntro'
import TranscriptionLine from '~/components/TranscriptionLine'
import MSBreadcrumbs from '~/components/MSBreadcrumbs'
import TranscriptionMap from '~/components/TranscriptionMap'

import WeeklyTask from '~/components/WeeklyTask'

export default {
  data() {
    return {
      show_side: false,
      show_help: false,
      transcribeSectionWeight: 8
    }
  },
  components: {
    TranscriptionLine,
    TranscriptionIntro,
    MSBreadcrumbs,
    WellDone,
    WeeklyTask,
    TranscriptionMap,
    HelpSection
  },
  methods: {
    showHelp() {
      this.$store.dispatch('general/showHelp', true)
    }
  },

  head() {
    return {
      title: `Tikkoun Sofrim - ${this.manuscript.display_name} - Transcribe`
    }
  },
  computed: {
    line() {
      return this.$store.state.transcribe.selected_line
    },
    manuscript() {
      return this.$store.state.transcribe.manuscript
    }
  },
  watch: {
    line: function(res) {
      if (res) {
        if (this.$i18n.locale === this.$i18n.defaultLocale) {
          this.$router.push(
            `/transcribe/${this.$store.state.transcribe.manuscript.name}/${
              res.page
            }/${res.line}`
          )
        } else {
          this.$router.push(
            `/${this.$i18n.locale}/transcribe/${
              this.$store.state.transcribe.manuscript.name
            }/${res.page}/${res.line}`
          )
        }
      }
    }
  },
  // Maybe watch on line from store
  async mounted() {
    await this.$store.dispatch('transcribe/GET_TASK')
    const routeParams = this.$route.params
    const user = this.$store.state.auth.user
    if (user) {
      if (
        user.transcribe_mode &&
        user.transcribe_mode == 'tasks' &&
        this.$store.state.transcribe.task
      ) {
        this.$store.dispatch('transcribe/getTaskLine', {
          uid: user.uid,
          isAnonymous: user.isAnonymous
        })
      } else if (routeParams && routeParams.line) {
        this.$store.dispatch('transcribe/getLine', {
          msId: this.$store.state.transcribe.manuscript.id,
          page: +routeParams.page,
          line: +routeParams.line,
          uid: user.uid
        })
      } else {
        this.$store.dispatch('transcribe/getNextLine', {
          uid: user.uid,
          isAnonymous: user.isAnonymous
        }) // Later add line params
      }
    }

    // Get manuscript content - for the instruction tabs
    const currentLang = this.$i18n.locales.find(l => {
      return l.code === this.$i18n.locale
    })

    this.$store.dispatch('content/getManuscriptContent', {
      manuscript: this.$store.state.transcribe.manuscript.name.toLowerCase(),
      lang: currentLang.iso
    })

    // Adjust style
    const mapSectionHeight = window.innerHeight - 110
    const mapSectionElem = document.getElementById('map-section')
    if (mapSectionElem) {
      mapSectionElem.height = mapSectionHeight
    }
  }
}
</script>
<style lang="scss" scoped>
.transcribe-page {
  overflow: hidden;
  flex-shrink: 1;
  max-height: inherit;
}
</style>