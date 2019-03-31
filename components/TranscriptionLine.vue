<template>
  <div>
    <img
      id="imgline"
      alt="Image of line in page"
      width="100%"
      :src="transcribedLineImgSrc"
      class="imageline"
      v-if="transcribedLineImgSrc"
    >

    <div class="mt-2">
      <input
        id="trw"
        type="text"
        name="transcribed"
        autocomplete="off"
        style="font-family: Corsiva"
        class="w-100 p-2 rtl"
        :value="transcription"
        @keyup="change"
        @mouseup="select"
        v-if="line"
        @select="select"
      >
    </div>
    <!-- Transcribe toolbar -->
    <div class="justify-content-between d-flex mt-3 p-10" dir="ltr">
      <div class="btn-group" role="group" aria-label="First group" dir="ltr">
        <button type="button" class="btn btn-secondary">
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
        </button>
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
      <!-- right part -->
      <div class="btn-group" role="group" aria-label="Second group" dir="ltr">
        <button
          :title="$t('main.work_area.hovers.over_reset')"
          class="rounded-0 btn btn-secondary"
          type="button"
          onclick="myReset()"
        >
          <span style="font-size: larger;">{{$t('main.work_area.button_5')}}</span>
        </button>
        <button
          :title="$t('main.work_area.hovers.over_alef_plus')"
          class="rounded-0 btn btn-secondary"
          type="button"
          onclick="myResize(1)"
        >
          <span style="font-size: larger;">
            <b>א+</b>
          </span>
        </button>
        <button
          :title="$t('main.work_area.hovers.over_alef_minus')"
          class="rounded-0 btn btn-secondary"
          type="button"
          onclick="myResize(-1)"
        >
          <span style="font-size: smaller;">
            <b>א-</b>
          </span>
        </button>
      </div>
    </div>

    <div id="activity" class="mt-2 align-self-center w-60 btn-group" role="group">
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
export default {
  data() {
    return {
      transcribedLineImgSrc: null
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
      this.$store.dispatch('updateTranscription', res.AT)
      const top = res.top_on_page
      const bottom = res.bottom_on_page
      const left = res.left_on_page
      const right = res.right_on_page

      const height = bottom - top
      const width = right - left

      // The scheme is left, top, width, height
      this.transcribedLineImgSrc = `https://tikkoun-sofrim.haifa.ac.il/cantaloupe/iiif/2/${
        res.color_img_file_name
      }/${left},${top},${width},${height}/full/0/default.jpg`
    }
  },
  methods: {
    manipulateLineByAdding(mark) {
      this.$store.dispatch('manipulateLineByAdding', mark)
    },
    select(e) {
      this.$store.dispatch('setSelectedTextRange', {
        start: e.target.selectionStart,
        end: e.target.selectionEnd
      })
    },
    change(e) {
      this.$store.dispatch('updateTranscription', e.target.value)
    },
    done() {
      this.$store.dispatch('addTranscription')
    },
    skip() {
      // Skip and...
      this.$store.dispatch('getLine') // Later add line params
    }
  }
}
</script>
<style lang="scss" scoped>
#trw {
  direction: rtl;
}
</style>
