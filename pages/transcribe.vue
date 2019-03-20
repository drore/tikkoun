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
                      <img src="/img/video_thumb.png">
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
                  src="${transcribedlineimgsrc}"
                  class="imageline"
                >

                <form action="${pageContext.request.contextPath}/TranscribeServlet" method="post">
                  <div class="mt-2">
                    <input
                      id="trw"
                      type="text"
                      name="transcribed"
                      autocomplete="off"
                      value="${transcribedline}"
                      style="font-family: Corsiva"
                      class="w-100 p-2 rtl"
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

                    <div
                      id="activity-buttons"
                      class="mt-2 d-flex justify-content-between"
                      dir="rtl"
                    >
                      <button
                        type="submit"
                        class="btn btn-warning"
                        name="status"
                        value="Skip"
                      >{{$t('main.work_area.finish_button_2')}}</button>
                      <button
                        type="submit"
                        class="btn btn-success"
                        name="status"
                        value="Done"
                      >{{$t('main.work_area.finish_button_1')}}</button>
                    </div>
                  </div>
                </form>
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
                >{{$t('main.data_area.Issues')}}</a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link sfont"
                  id="ab-tab"
                  data-toggle="tab"
                  role="tab"
                  href="#ab"
                  aria-controls="ab"
                >{{$t('main.data_area.Alphabet')}}</a>
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
                <a href="${manuscriptDescLink}" target="_blank">
                  <label
                    style="clear: both; color: blue;"
                    title="${manuscriptShortDesc}"
                  >${manuscriptName}</label>
                </a>
                <label>
                  - Page ${manuscriptPage} /
                  ${manuscriptTotalPages}, Line ${manuscriptLine} /
                  ${manuscriptTotalLines}
                </label>
              </div>

              <div id="map"></div>
            </div>
            <div id="special" class="tab-pane fade" role="tabpanel" aria-labelledby="profile-tab">
              <div class="tabcontent">
                <!-- <jsp:include page="parts/${lang}/transcribe/special.jspf"/> -->
              </div>
            </div>
            <div id="ab" class="tab-pane fade" role="tabpanel" aria-labelledby="ab-tab">
              <div class="tabcontent">
                <!-- <jsp:include page="parts/${lang}/transcribe/abc.jspf"/> -->
              </div>
            </div>
            <div id="marked" class="tab-pane fade" role="tabpanel" aria-labelledby="marked-tab">
              <div class="tabcontent">
                <!-- <jsp:include page="parts/${lang}/transcribe/marked.jspf"/> -->
              </div>
            </div>
            <div id="help" class="tab-pane fade" role="tabpanel" aria-labelledby="help-tab">
              <div class="tabcontent">
                <!-- <jsp:include page="parts/${lang}/transcribe/help.jspf"/> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
  mounted() {
    const self = this
    const L = window.L

    const map = L.map('map', {
      center: [0, 0],
      minZoom: 0,
      zoom: 0,
      zoomSnap: 0,
      zoomDelta: 0.25,
      crs: L.CRS.Simple,
      dragging: !L.Browser.mobile
    })
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

    linePolygonLayer.addTo(map)

    map.attributionControl.setPrefix('')
    map.attributionControl.addAttribution(
      self.$store.state.manuscript.attribution
    )
  }
}
</script>
