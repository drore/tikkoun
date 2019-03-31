<template>
  <div>
    <div class="transcribe-page container-fluid mt-2">
      <div class="row h-100">
        <!-- Column Two work area -->
        <div id="transcribe" class="container col-md-8">
          <div class="flex-fill d-flex flex-column justify-content-around">
            <div class="w-100 p-3">
              <div id="work-page" class="d-flex flex-column justify-content-between">
                <div class="header mb-4 row">
                  <div class="col-md-10 col-8">
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
        </div>
        <div class="info-page container col-md-4">
          <InfoTabs/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TranscriptionLine from '~/components/TranscriptionLine'

import InfoTabs from '~/components/InfoTabs'

export default {
  layout: 'inner',
  components: {
    TranscriptionLine,
    InfoTabs
  },
  computed: {
    line() {
      return this.$store.state.selected_line
    }
  },
  watch: {
    line: function(res) {
      this.$router.push(`/transcribe/${this.$store.state.manuscript.name}/${res.page}/${res.line}`)
    }
  },
  // Maybe watch on line from store
  mounted() {
    this.$store.dispatch('getLine') // Later add line params
    this.$store.dispatch('getManuscriptContent', {
      manuscript: this.$store.state.manuscript.name.toLowerCase(),
      lang: this.$i18n.locale
    })
  }
}
</script>
<style lang="scss">
.video_tut {
  a {
    img {
      width: 100%;
      border: 1px solid black;
    }
  }
}
</style>
