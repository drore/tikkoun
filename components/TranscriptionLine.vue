<template>
  <div>
    <div id="v-viewer-container">
      <viewer
        id="v-viewer"
        :options="viewerOptions"
        :images="images"
        @inited="viewerInited"
        class="viewer"
        ref="viewer"
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
    <!-- <div class="d-flex justify-content-between">
      <div>
        <label for="contrast">{{$t('contrast')}}</label>
        <input
          type="range"
          class="custom-range"
          id="contrast"
          value="1"
          @change="changeImage('contrast')"
          min="0.5"
          step="0.1"
          max="2.5"
        >
      </div>
      <div>
        <label for="brightness">{{$t('brightness')}}</label>
        <input
          type="range"
          class="custom-range"
          id="brightness"
          @change="changeImage('brightness')"
          min="0.5"
          step="0.1"
          value="1"
          max="2.5"
        >
      </div>
      <div>
        <label for="invert">{{$t('invert')}}</label>
        <input
          type="range"
          class="custom-range"
          id="invert"
          @change="changeImage('invert')"
          min="0"
          step="0.1"
          value="0"
          max="1"
        >
      </div>
    </div>-->
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
          title="main.work_area$overs.over_ligature"
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
      <!-- right part -->
      <div class="btn-group col" role="group" aria-label="Second group" dir="ltr">
        <button
          :title="$t('main.work_area.hovers.over_reset')"
          class="btn btn-secondary btn-sm"
          type="button"
          @click="reset"
        >
          <span style="font-size: larger;">{{$t('main.work_area.button_5')}}</span>
        </button>

        <button
          :title="$t('main.work_area.hovers.over_alef_minus')"
          class="btn btn-secondary btn-sm"
          type="button"
          @click="changeFontSize(-1)"
        >
          <span style="font-size: smaller;">
            <b>א-</b>
          </span>
        </button>
        <button
          :title="$t('main.work_area.hovers.over_alef_plus')"
          class="btn btn-secondary btn-sm"
          type="button"
          @click="changeFontSize(1)"
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
      imagefilters: { contrast: 1, brightness: 1, invert: 0 },
      viewer: null,
      images: [],
      fontSize: 16,
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
      return this.$store.state.selected_line
    },
    transcription() {
      return this.$store.state.transcription
    }
  },
  watch: {
    // whenever question changes, this function will run
    line: function(res) {
      if (res) {
        this.$store.dispatch('trancribe/updateTranscription', res.AT)
        this.color_img_file_name = res.color_img_file_name
        this.polygonObj = {
          top: res.top_on_page,
          bottom: res.bottom_on_page,
          left: res.left_on_page,
          right: res.right_on_page
        }

        this.polygonObj.height = this.polygonObj.bottom - this.polygonObj.top
        this.polygonObj.width = this.polygonObj.right - this.polygonObj.left

        const elemWidth = parseInt($('#work-page').width()) * 3

        // The scheme is left, top, width, height
        this.images = [
          `https://tikkoun-sofrim.haifa.ac.il/cantaloupe/iiif/2/${
            this.color_img_file_name
          }/${this.polygonObj.left},${this.polygonObj.top},${
            this.polygonObj.width
          },${this.polygonObj.height}/${elemWidth},/0/default.jpg`
        ]
      }
    }
  },

  methods: {
    changeImage(property) {
      this.imagefilters[property] = event.target.value
      let filterString = ''
      for (let filter in this.imagefilters) {
        filterString = filterString + ` ${filter}(${this.imagefilters[filter]})`
      }

      $('.viewer-canvas>img').css({
        filter: filterString
      })
    },
    viewerInited(viewer) {
      const self = this
      self.viewer = viewer
      self.viewer.options.viewed = function() {
        const lineImageRatio =
          $('#original-line-image').width() / $('#original-line-image').height()

        const ratio =
          $(self.viewer.element).width() / $('#original-line-image').width()
        self.viewer.zoomTo(ratio * 1.1)
        // Adjust the font size inside the input
        self.resetFontSize()
      }
    },
    manipulateLineByAdding(mark) {
      this.$store.dispatch('trancribe/manipulateLineByAdding', mark)
    },
    reset() {
      this.$store.dispatch('trancribe/resetTranscription')
    },
    resetFontSize() {      
      const imgElement = $('.viewer-canvas>img')

      const fontSize = Math.trunc(imgElement.height()*0.6) - 1
      $('#trw').css({
        fontSize: fontSize + 'px',
        height: Math.max(fontSize * 1.3 + 'px',imgElement.height())
      })
    },
    changeFontSize(change) {
      let fontSize = parseInt($('#trw').css('fontSize'))
      if (change < 0) {
        fontSize = Math.max(10, fontSize + change)
      } else {
        fontSize = Math.min(100, fontSize + change)
      }
      $('#trw').css({
        fontSize: fontSize + 'px',
        height: fontSize * 1.3 + 'px'
      })
    },
    select(e) {
      this.$store.dispatch('trancribe/setSelectedTextRange', {
        start: e.target.selectionStart,
        end: e.target.selectionEnd
      })
    },
    change(e) {
      this.$store.dispatch('trancribe/updateTranscription', e.target.value)
    },
    done() {
      this.$store.dispatch('trancribe/addTranscription')
    },
    skip() {
      // Skip and...
      this.$store.dispatch('trancribe/skip') // Later add line params
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
#v-viewer-container {
  min-height: 10vh;
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
