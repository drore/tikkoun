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
                    v-model="transcription"
                    v-if="line"
                  >
                  <input id="trwOrig" type="hidden" value="${transcribedline}">
                </div>
                <!-- Transcribe toolbar -->
                <div
                  class="btn-toolbar justify-content-between d-flex mt-3 p-10"
                  role="toolbar"
                  dir="ltr"
                >
                  <div class="btn-group" role="group" aria-label="First group" dir="rtl">
                    <button
                      :title="$t('main.work_area.hovers.over_additions')"
                      class="rounded-0 btn btn-secondary"
                      type="button"
                      onclick="myMark(']','[')"
                    >
                      <span style="font-size: larger;">{{$t('main.work_area.button_2')}}</span>
                    </button>
                    <button
                      :title="$t('main.work_area.hovers.over_deletions')"
                      class="rounded-0 btn btn-secondary"
                      type="button"
                      onclick="myMark(')','(')"
                    >
                      <span style="font-size: larger;">{{$t('main.work_area.button_1')}}</span>
                    </button>
                    <button
                      :title="$t('main.work_area.hovers.over_damaged')"
                      class="rounded-0 btn btn-secondary"
                      type="button"
                      onclick="myMark('>','<')"
                    >
                      <span style="font-size: larger;">{{$t('main.work_area.button_3')}}</span>
                    </button>
                    <button
                      :title="$t('main.work_area.hovers.over_uncertain')"
                      class="rounded-0 btn btn-secondary"
                      type="button"
                      onclick="myMark('}','{')"
                    >
                      <span style="font-size: larger;">{{$t('main.work_area.button_4')}}</span>
                    </button>

                    <button
                      :title="$t('main.work_area.hovers.over_upper')"
                      class="rounded-0 btn btn-secondary"
                      type="button"
                      onclick="myInsert('˙')"
                    >
                      <b>˙</b>
                    </button>
                    <button
                      class="rounded-0 btn btn-secondary"
                      type="button"
                      :title="$t('main.work_area.hovers.over_ligature')"
                      onclick="myInsert('ﭏ')"
                    >
                      <b>ﭏ</b>
                    </button>
                    <select
                      id="filler"
                      class="custom-select-sm btn-secondary"
                      :title="$t('main.work_area.hovers.over_line_fillers')"
                      onchange="myFill()"
                    >
                      <option value>&nbsp;</option>
                      <option value="/">/</option>
                      <option value="//">//</option>
                      <option value="|">|</option>
                      <option value="V">V</option>
                      <option value="'">'</option>
                    </select>
                  </div>
                  <!-- right part -->
                  <div class="btn-group" role="group" aria-label="Second group" dir="rtl">
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
            </div>
          </div>
        </div>
        <div class="info-page container col-md-4">
          <div>
            <ul class="nav nav-tabs flex-nowrap" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active sfont"
                  id="page-tab"
                  data-toggle="tab"
                  role="tab"
                  href="#page"
                  aria-controls="page"
                  aria-selected="true"
                >{{$t('main.data_area.page')}}</a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link sfont"
                  id="special-tab"
                  data-toggle="tab"
                  role="tab"
                  href="#special"
                  aria-controls="special"
                >{{$t('main.data_area.issues')}}</a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link sfont"
                  id="ab-tab"
                  data-toggle="tab"
                  role="tab"
                  href="#ab"
                  aria-controls="ab"
                >{{$t('main.data_area.alphabet')}}</a>
              </li>

              <li class="nav-item sfont">
                <a
                  class="nav-link"
                  id="marked-tab"
                  data-toggle="tab"
                  role="tab"
                  href="#marked"
                  aria-controls="marked"
                >{{$t('main.data_area.editing')}}</a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link sfont"
                  id="help-tab"
                  data-toggle="tab"
                  role="tab"
                  href="#help"
                  aria-controls="help"
                >
                  <strong>{{$t('main.data_area.help')}}</strong>
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content">
            <div
              id="page"
              class="tab-pane fade show active flex-fill d-flex justify-content-between flex-column"
              role="tabpanel"
              aria-labelledby="page-tab"
            >
              <div id="imgPage">
                <a :href="manuscript.descLink" target="_blank">
                  <label
                    style="clear: both; color: blue;"
                    :title="manuscript.short_desc"
                  >{{manuscript.name}}</label>
                </a>-->
                <label v-if="line">
                  - Page {{line.page}} /
                  {{manuscript.total_pages}}, Line {{line.line}} /
                  {{manuscript.total_lines}}
                </label>
              </div>

              <div id="map"></div>
            </div>
            <div id="special" class="tab-pane fade" role="tabpanel" aria-labelledby="profile-tab">
              <div class="tabcontent">
                <div class="tabcontent" v-html="content.special" v-if="content.special"></div>
              </div>
            </div>
            <div id="ab" class="tab-pane fade" role="tabpanel" aria-labelledby="ab-tab">
              <div class="tabcontent">
                <div class="tabcontent" v-html="content.alphabet" v-if="content.alphabet"></div>
              </div>
            </div>
            <div id="marked" class="tab-pane fade" role="tabpanel" aria-labelledby="marked-tab">
              <div class="tabcontent">
                <div class="tabcontent" v-html="content.marked" v-if="content.marked"></div>
              </div>
            </div>
            <div id="help" class="tab-pane fade" role="tabpanel" aria-labelledby="help-tab">
              <div class="tabcontent" v-html="content.help" v-if="content.help"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import manuscriptsManager from '~/manuscriptsManager'
export default {
  data() {
    return {
      transcription: null,
      transcribedLineImgSrc: null,
      map: null
    }
  },
  methods: {
    done() {
      this.$store.dispatch('addTranscription', this.transcription)
    },
    skip() {
      // Skip and...
      this.$store.dispatch('getLine') // Later add line params
    }
  },
  computed: {
    content() {
      const content = {}
      if (this.$store.state.manuscript_content.length) {
        this.$store.state.manuscript_content.forEach(i => {
          content[i.token] = i.value
        })
      }

      return content
    },
    manuscript() {
      return this.$store.state.manuscript
    },
    manuscriptName() {
      return this.$store.state.manuscript.name
    },
    manuscriptShortDesc() {
      return this.$store.state.manuscript.short_desc
    },
    line() {
      return this.$store.state.manuscript.selected_line
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet-draw@0.4.10/dist/leaflet.draw.css'
        }
      ]
    }
  },
  watch: {
    // whenever question changes, this function will run
    line: function(res) {
      this.transcription = res.GT01

      const L = window.L
      const self = this

      const height = res.bottom_on_page - res.top_on_page
      const width = res.right_on_page - res.left_on_page

      // The scheme is left, top, width, height
      this.transcribedLineImgSrc = `https://tikkoun-sofrim.haifa.ac.il/cantaloupe/iiif/2/${
        res.color_img_file_name
      }/${res.left_on_page},${
        res.top_on_page
      },${width},${height}/full/0/default.jpg`

      // Now the full image
      // https://tikkoun-sofrim.haifa.ac.il/cantaloupe/iiif/2/bge-cl0146_195.jpg/0,0,6132,8176/384,/0/default.jpg
      const fullPageImgSrc = `https://tikkoun-sofrim.haifa.ac.il/cantaloupe/iiif/2/${
        res.color_img_file_name
      }/info.json`

      const pageTileLayer = L.tileLayer.iiif(fullPageImgSrc)
      const imageLayer = pageTileLayer.addTo(this.map)

      const linePolygonLayer = L.polygon(
        [
          [
            self.$store.state.manuscript.page.line.polygon.top_left.y,
            self.$store.state.manuscript.page.line.polygon.top_left.x
          ], // top_left
          [
            self.$store.state.manuscript.page.line.polygon.top_right.y,
            self.$store.state.manuscript.page.line.polygon.top_right.x
          ], // top_right
          [
            self.$store.state.manuscript.page.line.polygon.bottom_right.y,
            self.$store.state.manuscript.page.line.polygon.bottom_right.x
          ], // bottom_right
          [
            self.$store.state.manuscript.page.line.polygon.bottom_left.y,
            self.$store.state.manuscript.page.line.polygon.bottom_left.x
          ] // bottom_left
        ],
        {
          color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.1,
          weight: 1
        }
      )

      linePolygonLayer.addTo(this.map)
    }
  },
  // Maybe watch on line from store
  mounted() {
    this.$store.dispatch('getLine') // Later add line params
    this.$store.dispatch('getManuscriptContent', {
      manuscript: this.manuscript.name.toLowerCase(),
      lang: this.$i18n.locale
    })
    // get line
    const self = this

    const L = window.L

    this.map = L.map('map', {
      center: [0, 0],
      minZoom: 0,
      zoom: 0,
      zoomSnap: 0,
      zoomDelta: 0.25,
      crs: L.CRS.Simple,
      dragging: !L.Browser.mobile
    })

    this.map.attributionControl.setPrefix('')
    this.map.attributionControl.addAttribution(
      self.$store.state.manuscript.attribution
    )
  }
}
</script>
<style lang="scss">
.show {
  #map {
    min-height: 500px;
  }
}
.video_tut {
  a {
    img {
      width: 100%;
      border: 1px solid black;
    }
  }
}
.tab-content {
  overflow-y: auto;
  overflow-x: hidden;
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
</style>
