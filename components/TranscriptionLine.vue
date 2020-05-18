<template>
  <div>
    <div class="expert-data d-flex justify-content-between" v-if="inExpertMode && line">
      <div>
        <div class="label">Views</div>
        <div class="value">{{line.views}}</div>
      </div>
      <div>
        <div class="label">Transcriptions</div>
        <div class="value">{{line.transcriptions}}</div>
      </div>
      <div>
        <div class="label">Score</div>
        <div class="value">{{line.score}}</div>
      </div>
    </div>

    <img :src="lineURL" style="width:100%" />

    <div style="margin-top:20px">
      <input
        id="trw"
        type="text"
        name="transcribed"
        autocomplete="off"
        style="font-family:Corsive;font-size: 1.7rem;"
        class="w-100 p-2"
        :value="transcription"
        @keyup="change"
        @mouseup="select"
        @select="select"
      />
    </div>

    <!-- Transcribe toolbar -->
    <div class="mt-3 p-10 row" dir="ltr">
      <div class="btn-group col mt-2" role="group" aria-label="First group" dir="ltr">
        <div class="dropdown">
          <button
            class="btn btn-tikkoun dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding(' ')">&nbsp;</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('/')">/</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('//')">//</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('|')">|</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('V')">V</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('\'')">'</a>
          </div>
        </div>
      </div>
      <div class="btn-group col mt-2" role="group" aria-label="First group" dir="ltr">
        <ManipulationButton
          title="main.work_area.hovers.over_ligature"
          action="ligature"
          content="main.work_area.over_ligature"
        />
        <ManipulationButton
          title="main.work_area.hovers.over_upper"
          action="upper"
          content="main.work_area.over_upper"
        />
        <ManipulationButton
          title="main.work_area.hovers.over_uncertain"
          action="uncertain"
          content="main.work_area.button_4"
        />
        <ManipulationButton
          title="main.work_area.hovers.over_damaged"
          action="damaged"
          content="main.work_area.button_3"
        />
        <ManipulationButton
          title="main.work_area.hovers.over_deletions"
          action="deletions"
          content="main.work_area.button_1"
        />
        <ManipulationButton
          title="main.work_area.hovers.over_additions"
          action="additions"
          content="main.work_area.button_2"
        />
        <ManipulationButton
          title="main.work_area.hovers.divine_name"
          action="divine_name"
          :t_content="getSpecialChar('divine_name')"
        />
      </div>
      <div class="btn-group col mt-2" role="group" aria-label="Second group" dir="ltr">
        <button
          :title="$t('main.work_area.hovers.over_reset')"
          class="btn btn-tikkoun btn-sm"
          type="button"
          @click="reset"
        >
          <span style="font-size: larger;">{{$t('main.work_area.button_5')}}</span>
        </button>
      </div>
      <!-- right part -->
      <div class="btn-group col mt-2" role="group" aria-label="Second group" dir="ltr">
        <button
          :title="$t('main.work_area.hovers.over_alef_minus')"
          class="btn btn-tikkoun btn-sm"
          type="button"
          @click="changeFontSize(0.1)"
        >
          <span style="font-size: smaller;">
            <b>א-</b>
          </span>
        </button>
        <button
          :title="$t('main.work_area.hovers.over_alef_plus')"
          class="btn btn-tikkoun btn-sm"
          type="button"
          @click="changeFontSize(-0.1)"
        >
          <span style="font-size: larger;">
            <b>א+</b>
          </span>
        </button>
      </div>
    </div>
    <div class="expert-interface" v-if="inExpertMode">
      <div class="user-transcriptions">
        <a href="javascript:;" @click="getUserTranscriptions">Get user transcriptions</a>
        <div
          class="user-transcription d-flex justify-content-between"
          v-for="userTranscription in userTranscriptions"
          :key="userTranscription.id"
        >
          <div class="actions d-flex">
            <a
              href="javascript:;"
              @click="function(){markUserTranscription(userTranscription.id,false)}"
              :class="{ marked: !userTranscription.correct }"
            >&#10006;</a>
            <a
              href="javascript:;"
              @click="function(){markUserTranscription(userTranscription.id,true)}"
              :class="{ marked: userTranscription.correct }"
            >&#10004;</a>
          </div>
          <!-- <div class="user-data">{{userTranscription.uid}}</div> -->
          <div class="transcription">{{userTranscription.transcription}}</div>
        </div>
      </div>
      <hr />
      <div id="activity-buttons" class="mt-2 d-flex justify-content-between">
        <div>
          <button
            type="submit"
            class="btn btn-secondary"
            name="status"
            value="Previous line"
            @click="goToPreviousLine"
          >Previous line</button>
        </div>
        <div>
          <button
            type="submit"
            class="btn btn-primary"
            name="status"
            value="Skip"
            @click="() => {expertRule(false)}"
          >&#10006;</button>
        </div>

        <div>
          <button
            type="submit"
            class="btn btn-primary"
            name="status"
            value="Done"
            @click="() => {expertRule(true)}"
          >&#10004;</button>
        </div>
        <div>
          <button
            type="submit"
            class="btn btn-secondary"
            name="status"
            value="Next line"
            @click="goToNextLine"
          >Next line</button>
        </div>
      </div>
    </div>

    <div id="activity" class="mt-2 align-self-center w-60" v-if="!inExpertMode">
      <div>{{$t('main.work_area.finish_line_1')}}</div>
      <div>{{$t('main.work_area.finish_line_2')}}</div>

      <div id="activity-buttons" class="mt-2 d-flex justify-content-between">
        <div>
          <button
            type="submit"
            class="btn btn-warning"
            name="status"
            value="Skip"
            @click="skip"
          >{{$t('main.work_area.finish_button_2')}}</button>
        </div>

        <div>
          <button
            type="submit"
            class="btn btn-success"
            name="status"
            value="Done"
            @click="done"
          >{{$t('main.work_area.finish_button_1')}}</button>
        </div>
      </div>
    </div>
    <div v-if="!inExpertMode">
      <Conversation
        v-if="manuscript && line"
        :context="`${manuscript.name}_${line.page}_${line.line}`"
      />
    </div>
  </div>
</template>
<script>
import ManipulationButton from '~/components/ManipulationButton'
import Conversation from '~/components/Conversation'
import { setTimeout } from 'timers'
import axios from 'axios'
export default {
  data() {
    return {
      nextLine: null,
      prevLine: null,
      fitTextFactor: 2.5,
      imagefilters: { contrast: 1, brightness: 1, invert: 0 },
      polygon: {},
      color_img_file_name: null,
      lineURL: ''
    }
  },
  components: {
    ManipulationButton,
    Conversation
  },
  computed: {
    isExpert() {
      return this.$store.state.auth.user.expert
    },
    inExpertMode() {
      return this.$store.state.general.expert_mode
    },
    line() {
      return this.$store.state.transcribe.selected_line
    },
    userTranscriptions() {
      return this.$store.state.transcribe.user_transcriptions
    },
    manuscript() {
      return this.$store.state.transcribe.manuscript
    },
    transcription() {
      return this.$store.state.transcribe.transcription
    }
  },
  watch: {
    // whenever question changes, this function will run
    line: async function(res) {
      if (res) {
        // Send analytics show line event
        this.$gtag.event('show_line', {
          eventCategory: 'Site_Actions',
          eventAction: 'show_line',
          eventLabel: this.manuscript.id
        })

        this.$store.dispatch('transcribe/updateTranscription', res.AT)

        // Parse local presentation setup vars and assemble the IIIF URL for the line image
        this.lineURL = this.getLineURL(res)
      }
    }
  },

  methods: {
    changeFontSize(by) {},
    expertRule(rule) {
      this.$store.dispatch('transcribe/markUserTranscription', {
        transcriptionId: transcriptionId,
        mark: mark
      })
    },
    goToPreviousLine() {},
    goToNextLine() {},
    markUserTranscription(transcriptionId, mark) {
      this.$store.dispatch('transcribe/markUserTranscription', {
        transcriptionId: transcriptionId,
        mark: mark
      })
    },
    getUserTranscriptions() {
      this.$store.dispatch('transcribe/getLineUserTranscriptions', {
        manuscript: this.$store.state.transcribe.manuscript.id,
        page: this.line.page,
        line: this.line.line
      })
    },
    getLineURL(res) {
      let img_file_name = res.color_img_file_name || res.iiif_url

      // For geneva, strip the file extension
      if (img_file_name.indexOf('.jpg') != -1) {
        this.color_img_file_name = img_file_name.split('.jpg')[0]
      } else {
        this.color_img_file_name = img_file_name
      }

      this.polygonObj = this.getLinePolygon(res)

      if (img_file_name.indexOf('info.json') != -1) {
        this.color_img_file_name = img_file_name.split('info.json')[0]
      }

      if (img_file_name.indexOf(`.${this.manuscript.image_extension}`) != -1) {
        this.color_img_file_name = img_file_name.split(
          `.${this.manuscript.image_extension}`
        )[0]
      }

      const default_file_name = this.manuscript.default_file_name || 'default'

      const image_extension_1 =
        this.manuscript.image_extension_1 || this.manuscript.image_extension

      const image_extension_2 =
        this.manuscript.image_extension_2 || this.manuscript.image_extension

      const workPageWidth = document.getElementById('work-page').offsetWidth * 3

      const fullWidth = this.manuscript.full_width || workPageWidth

      const imageFilePart = `${this.manuscript.base_url}${
        this.color_img_file_name
      }.${image_extension_1}/`
      const endPart = `${fullWidth},/0/${default_file_name}.${image_extension_2}`

      // The scheme is left, top, width, height
      return `${imageFilePart}${this.polygonObj.left},${this.polygonObj.top},${
        this.polygonObj.width
      },${this.polygonObj.height}/${endPart}`
    },
    getLinePolygon(res) {
      let polygonObj = {
        top: res.top_on_page,
        bottom: res.bottom_on_page,
        left: res.left_on_page,
        right: res.right_on_page
      }

      polygonObj.height = polygonObj.bottom - polygonObj.top
      polygonObj.width = polygonObj.right - polygonObj.left

      return polygonObj
    },
    getSpecialChar(char) {
      const manuscript = this.manuscript
      if (manuscript.special_char) {
        if (manuscript.special_char['divine_name']) {
          return manuscript.special_char['divine_name']
        }
      }

      return 'ײ'
    },

    setCursorPosition() {
      const cursorLocation = this.$store.state.transcribe.selected_line
        .selected_range.end

      const inputElem = document.getElementById('trw')
      inputElem.focus()
      inputElem.setSelectionRange(cursorLocation, cursorLocation)
    },
    manipulateLineByAdding(mark) {
      const self = this
      this.$store
        .dispatch('transcribe/manipulateLineByAdding', mark)
        .then(() => {
          self.setCursorPosition()
        })
    },
    reset() {
      const self = this
      this.$store.dispatch('transcribe/resetTranscription').then(() => {
        self.setCursorPosition()
      })
    },

    select(e) {
      this.$store.dispatch('transcribe/setSelectedTextRange', {
        start: e.target.selectionStart,
        end: e.target.selectionEnd
      })
    },
    change(e) {
      this.$store.dispatch('transcribe/updateTranscription', e.target.value)
      this.$store.dispatch('transcribe/setSelectedTextRange', {
        start: e.target.selectionEnd,
        end: e.target.selectionEnd
      })
    },
    done() {
      this.$store
        .dispatch('transcribe/addTranscription', {
          user: this.$store.state.auth.user,
          skipped: false
        })
        .then(res => {
          this.$store.dispatch('auth/updateUserLinesTranscribed')
          this.$gtag.event('done_line', {
            eventCategory: 'Transcribe_Actions',
            eventAction: 'done_line',
            eventLabel: this.manuscript.id
          })
        })
    },
    skip() {
      // The last params is for 'skipped'
      this.$store
        .dispatch('transcribe/addTranscription', {
          user: this.$store.state.auth.user,
          skipped: true
        })
        .then(res => {
          this.$gtag.event('skipped_line', {
            eventCategory: 'Transcribe_Actions',
            eventAction: 'skipped_line',
            eventLabel: this.manuscript.id
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#trw {
  direction: rtl;
}
#line-image-container {
  overflow: auto;
  height: 10vh;
}
.expert-data {
  .label,
  .value {
    padding: 5px;
    text-align: center;
  }
  .label {
    font-weight: bold;
    background-color: lightgrey;
  }
  .value {
  }
}
.marked {
  background-color: yellow !important;
}
.line-image-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  a {
    background-color: #6c757d;
    display: block;
    text-align: center;
    color: white;
    flex: 1;
    font-size: 5vw;
    &:first-of-type {
      margin-bottom: 5px;
    }
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
