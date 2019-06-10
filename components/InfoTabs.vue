<template>
  <div>
    <b-modal ref="modal-help" id="modal-help" title="Help" centered scrollable ok-only>
      <div>
        <ul class="nav nav-tabs flex-nowrap" role="tablist">
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
    </b-modal>
  </div>
</template>
<script>
export default {
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
.tab-content {
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-tabs {
  padding: 0;
  .nav-item {
    font-size: 0.8rem;
  }
}
.info-page .flex-nowrap {
  overflow-x: auto;
  overflow-y: hidden;
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
        height: 100%;
      }
    }
  }
}
</style>
