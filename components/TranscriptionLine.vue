<template>
  <div>
    <div id="v-viewer-container">
      <div
        v-if="!line"
        style="font-size:20px;text-align:center;width:100%"
        class="m-2"
      >{{$t('loading')}}</div>
      <viewer
        id="v-viewer"
        :options="viewerOptions"
        :images="images"
        @inited="viewerInited"
        class="viewer"
        ref="viewer"
        v-if="line"
      >
        <template slot-scope="scope">
          <img
            v-for="src in scope.images"
            :src="src"
            :key="src"
            alt="Image of line in page"
            id="original-line-image"
            style="display:none"
          >
        </template>
      </viewer>
    </div>

    <div style="margin-top:20px">
      <input
        id="trw"
        type="text"
        name="transcribed"
        autocomplete="off"
        style="font-family:Corsive;"
        class="w-100 p-2 rtl"
        :value="transcription"
        @keyup="change"
        @mouseup="select"
        @select="select"
      >
    </div>
    <!-- Transcribe toolbar -->
    <div class="mt-3 p-10 row" dir="ltr">
      <div class="btn-group col" role="group" aria-label="First group" dir="ltr">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{$t('fillers')}}</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding(' ')">&nbsp;</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('/')">/</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('//')">//</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('|')">|</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('V')">V</a>
            <a class="dropdown-item" href="#" @click="manipulateLineByAdding('\'')">'</a>
          </div>
        </div>

        <ManipulationButton
          title="main.work_area.hovers.over_ligature"
          action="ligature"
          content="ﭏ"
        />
        <ManipulationButton title="main.work_area.hovers.over_upper" action="upper" content="˙"/>
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
      </div>
      <div class="btn-group col" role="group" aria-label="Second group" dir="ltr">
        <button
          :title="$t('main.work_area.hovers.over_reset')"
          class="btn btn-secondary btn-sm"
          type="button"
          @click="reset"
        >
          <span style="font-size: larger;">{{$t('main.work_area.button_5')}}</span>
        </button>
      </div>
      <!-- right part -->
      <div class="btn-group col" role="group" aria-label="Second group" dir="ltr">
        <button
          :title="$t('main.work_area.hovers.over_alef_minus')"
          class="btn btn-secondary btn-sm"
          type="button"
          @click="changeFontSize(0.1)"
        >
          <span style="font-size: smaller;">
            <b>א-</b>
          </span>
        </button>
        <button
          :title="$t('main.work_area.hovers.over_alef_plus')"
          class="btn btn-secondary btn-sm"
          type="button"
          @click="changeFontSize(-0.1)"
        >
          <span style="font-size: larger;">
            <b>א+</b>
          </span>
        </button>
      </div>
    </div>

    <div id="activity" class="mt-2 align-self-center w-60">
      <div>{{$t('main.work_area.finish_line_1')}}</div>
      <div>{{$t('main.work_area.finish_line_2')}}</div>

      <div id="activity-buttons" class="mt-2 d-flex justify-content-between" dir="rtl">
        <button
          type="submit"
          class="btn btn-warning"
          name="status"
          value="Skip"
          @click="skip"
        >{{$t('main.work_area.finish_button_2')}}</button>
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
</template>
<script>
import ManipulationButton from '~/components/ManipulationButton'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      nextLine: null,
      prevLine: null,
      fitTextFactor: 2.5,
      imagefilters: { contrast: 1, brightness: 1, invert: 0 },
      viewer: null,
      images: [],
      polygon: {},
      color_img_file_name: null,
      viewerOptions: {
        inline: true,
        button: false,
        navbar: false,
        title: false,
        toolbar: false,
        tooltip: false,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: true,
        fullscreen: false,
        keyboard: false,
        backdrop: false,
        url: 'data-source'
      }
    }
  },
  components: {
    ManipulationButton
  },
  computed: {
    line() {
      return this.$store.state.transcribe.selected_line
    },
    transcription() {
      return this.$store.state.transcribe.transcription
    }
  },
  watch: {
    // whenever question changes, this function will run
    line: function(res) {
      if (res) {
        this.$store.dispatch('transcribe/updateTranscription', res.AT)
        // For geneva, strip the file extension
        if (res.color_img_file_name.indexOf('.jpg') != -1) {
          this.color_img_file_name = res.color_img_file_name.split('.jpg')[0]
        } else {
          this.color_img_file_name = res.color_img_file_name
        }

        this.polygonObj = {
          top: res.top_on_page,
          bottom: res.bottom_on_page,
          left: res.left_on_page,
          right: res.right_on_page
        }

        this.polygonObj.height = this.polygonObj.bottom - this.polygonObj.top
        this.polygonObj.width = this.polygonObj.right - this.polygonObj.left

        const elemWidth = parseInt($('#work-page').width()) * 3
        const imageFilePart = `https://tikkoun-sofrim.haifa.ac.il/cantaloupe/iiif/2/${
          this.color_img_file_name
        }.${this.$store.state.transcribe.manuscript.image_extension}/`
        const endPart = `${elemWidth},/0/default.${
          this.$store.state.transcribe.manuscript.image_extension
        }`

        const extendedImgFactor = 20
        const widthFactor = extendedImgFactor
        const heightFactor = extendedImgFactor / 4

        // The scheme is left, top, width, height
        let left = this.polygonObj.left - this.polygonObj.width / widthFactor
        left = left < 0 ? 0 : left

        const extendedWidth =
          this.polygonObj.width * ((widthFactor + 2) / widthFactor)

        const width = this.polygonObj.width
        const height = this.polygonObj.height

        this.currLineImage = `${imageFilePart}${left},${
          this.polygonObj.top
        },${extendedWidth},${this.polygonObj.height}/${endPart}`

        this.images = [this.currLineImage]

        $('#v-viewer-container').height(
          this.polygonObj.height /
            this.$store.state.transcribe.manuscript.factor
        )
      }
    }
  },

  methods: {
    viewerInited(viewer) {
      const self = this
      self.viewer = viewer
      self.viewer.options.viewed = function(event) {
        const image = event.detail.image
        const originalImage = event.detail.originalImage
        const ratio = originalImage.width / this.viewer.element.offsetWidth
        self.viewer.zoomTo(1 / ratio)
        self.viewer.moveTo(0, 15)

        // Adjust the font size inside the input
        self.resetFontSize()
      }
    },
    setCursorPosition() {
      const cursorLocation = this.$store.state.transcribe.selected_line
        .selected_range.end

      const inputElem = document.getElementById('trw')
      inputElem.focus()
      inputElem.setSelectionRange(cursorLocation + 2, cursorLocation + 2)
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
    resetFontSize() {
      const imgElement = $('.viewer-canvas>img')
      jQuery('#trw').fitText(this.fitTextFactor, {
        minFontSize: '8px',
        maxFontSize: '35px'
      })
    },
    changeFontSize(change) {
      this.fitTextFactor += change
      jQuery('#trw').fitText(this.fitTextFactor, {
        minFontSize: '8px',
        maxFontSize: '35px'
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
    },
    done() {
      this.$store.dispatch('transcribe/addTranscription', {
        user: this.$store.state.auth.user,
        skipped: false
      })
    },
    skip() {
      // The last params is for 'skipped'
      this.$store.dispatch('transcribe/addTranscription', {
        user: this.$store.state.auth.user,
        skipped: true
      })
    }
  }
}
</script>
<style lang="scss">
#trw {
  direction: rtl;
}
#line-image-container {
  overflow: auto;
  height: 10vh;
}

#v-viewer-container {
  min-height: 10vw;
  border: 1px solid #888;
  overflow: hidden;
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
