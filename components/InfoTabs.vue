<template>
  <div>
    <div
      class="help-docked p-2"
      v-if="$store.state.general.help_ui === 'docked' &&  $store.state.general.help_shown"
      :style="getDockedHelpStyle()"
    >
      <div slot="modal-header" class="w-100 d-flex justify-content-between">
        <h4>{{$t('help')}}</h4>
        <div>
          <a href="javascript:;" @click="changeHelpUI('popup')">🗗</a>
          <a href="javascript:;" @click="closeHelpDialog()">🗙</a>
        </div>
      </div>
      <div class="help">
        <Help></Help>
      </div>
    </div>
    <b-modal ref="modal-help" id="modal-help" :title="$t('help')" centered scrollable :lazy="true">
      <div slot="modal-header" class="w-100 d-flex justify-content-between">
        <h4>{{$t('help')}}</h4>
        <a href="javascript:;" @click="changeHelpUI('docked')">📌</a>
      </div>
      <div>
        <Help></Help>
      </div>

      <div slot="modal-footer" class="w-100 d-flex justify-content-between">
        <div></div>
        <div>
          <b-button variant="primary" @click="closeHelpDialog()">🗙</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Help from '~/components/Help'
export default {
  components: {
    Help
  },
  watch: {
    help_shown: function(shown) {
      if (this.$store.state.general.help_ui === 'popup') {
        if (shown) {
          this.$refs['modal-help'].show()
        } else {
          this.$refs['modal-help'].hide()
        }
      } else {
      }
    }
  },
  computed: {
    help_shown() {
      return this.$store.state.general.help_shown
    }
  },
  methods: {
    getDockedHelpStyle() {
      const transcribeWidth = $('#transcribe-section').width()
      const direction = this.$t('dir')

      let left = 0
      let right = 0
      let styleStr = ''

      if (direction === 'rtl') {
        right = `${transcribeWidth + 30}px`
        left = 0
      } else {
        left = `${transcribeWidth + 30}px`
        right = 0
      }

      return `left:${left};right:${right}`
    },
    changeHelpUI(ui) {
      this.$store.dispatch('general/changeHelpUI', ui)
      if (ui === 'docked') {
        this.$refs['modal-help'].hide()
      } else {
        this.$refs['modal-help'].show()
      }
    },
    closeHelpDialog() {
      this.$store.dispatch('general/showHelp', false)
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
  .help-item {
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

        height: 40px;
      }
    }
  }
}
.help-item {
  cursor: pointer;
  border-radius: 50%;
  padding: 20px;
  margin: 10px;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 15px;
  background-color: #00003c;
  color: white;
  font-weight: bold;
}
.mobile {
  .help-item {
    font-size: 11px;
  }
}
.help-docked {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 19999;
  background-color: white;
  box-shadow: 2px 0px 14px 6px #333;
  width: auto;
  overflow-y: auto;
}
.rtl .help-docked {
  left: 0;
  right: auto;
}

.ltr .help-docked {
  right: 0;
  left: auto;
}
</style>
