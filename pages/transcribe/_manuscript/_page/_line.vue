<template>
  <div class="transcribe-page container-fluid mt-2">
    <div class="row">
      <!-- Column Two work area -->
      <div id="transcribe-section" class="col-md-8 mb-2">
        <div class="w-100">
          <div id="work-page" class="d-flex flex-column justify-content-between">
            <div class="header mb-4 row">
              <div class="col-md-10 col-8">
                <WeeklyTask></WeeklyTask>
                {{ $t('main.work_area.intro_line_1') }}
                {{ $t('main.work_area.intro_line_2') }}
              </div>
              <div class="video_tut col-md-2 col-4">
                <a
                  :href="$t('main.work_area.video')"
                  :title="$t('main.work_area.video_hover')"
                  target="_blank"
                >
                  <img src="/images/video_thumb.png">
                  {{ $t('main.work_area.video_hover') }}
                </a>
              </div>
            </div>
          </div>
          <TranscriptionLine/>
        </div>
      </div>
      <div id="map-section" class="col-md-4">
        <div class="mb-3 d-flex justify-content-between">
          <div class="line-info d-flex justify-content-between w-100">
            <div>
              <a href="javascript:;" @click="showHelp()">{{$t('help')}}</a>
            </div>
            <div>
              <a :href="manuscript.descLink" target="_blank">
                <label :title="manuscript.short_desc">{{manuscript.display_name}}</label>
              </a>

              <label v-if="line">
                - Page {{line.page}} /
                {{manuscript.total_pages}}, Line {{line.line}} /
                {{manuscript.total_lines}}
              </label>
            </div>
          </div>
        </div>
        <TranscriptionMap/>
      </div>
      <InfoTabs/>
    </div>
  </div>
</template>

<script>
import TranscriptionLine from '~/components/TranscriptionLine'
import TranscriptionMap from '~/components/TranscriptionMap'
import WeeklyTask from '~/components/WeeklyTask'
import InfoTabs from '~/components/InfoTabs'

export default {
  data() {
    return {
      show_side: false
    }
  },
  components: {
    TranscriptionLine,
    TranscriptionMap,
    WeeklyTask,
    InfoTabs
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
  mounted() {
    this.$store.dispatch('transcribe/GET_TASK')
    const routeParams = this.$route.params
    const user = this.$store.state.auth.user
    if (user) {
      if (user.transcribe_mode && user.transcribe_mode == 'tasks') {
        this.$store.dispatch('transcribe/GET_TASK').then(() => {
          this.$store.dispatch('transcribe/getTaskLine', {
            uid: user.uid,
            isAnonymous: user.isAnonymous
          })
        })
      } else if (routeParams && routeParams.line) {
        this.$store.dispatch('transcribe/getLine', {
          msId: this.$store.state.transcribe.manuscript.id,
          page: +routeParams.page,
          line: +routeParams.line
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
  }
}
</script>
<style lang="scss">
#map-section {
  min-height: 300px;
}
.line-info {
  direction: ltr;
  text-align: left;
  font-size: 12px;
  white-space: nowrap;
}
.video_tut {
  a {
    img {
      width: 100%;
      border: 1px solid black;
    }
  }
}
</style>
