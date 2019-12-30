<template>
  <div class="row">
    <div class="sidebar col-3">
      <div class="accordion" id="sidebarAccordion">
        <div class="card">
          <div class="card-header" id="utilitiesHeading">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#utilities"
                aria-expanded="true"
                aria-controls="utilities"
              >{{$t('utilities')}}</button>
            </h5>
          </div>

          <div
            id="utilities"
            class="collapse"
            aria-labelledby="utilitiesHeading"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
              <!-- <a href="javascript:;" @click="tsvJSON">{{$t('tsv_to_json')}}</a> -->
              <a href="javascript:;" @click="loadIntoFB">Load into firebase</a>
              <!-- <a href="javascript:;" @click="scoreGeneva">Score Geneva</a> -->
              <hr />
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >{{$t('manuscript.content')}}</button>
            </h5>
          </div>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
              <a href="javascript:;" @click="getManuscriptContent">{{$t('get_manuscript_content')}}</a>
              <hr />
              <select name="langs" v-model="lang" @change="getManuscriptContent">
                <option
                  :value="locale.iso"
                  v-for="locale in this.$i18n.locales"
                  :key="locale.code"
                >{{ $t(`lang.${locale.code}`) }}</option>
              </select>
              <a href="javascript:;" @click="addMSContentItem">{{$t('add')}}</a>
              <div v-if="manuscript_content">
                <hr />
                <ul class="manuscript_content_tokens">
                  <li
                    v-for="(contentItem,i) in manuscript_content"
                    :key="i"
                    @click="editMSContentItem(contentItem)"
                  >{{contentItem.token}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content col-9">
      <div class="p-2">
        <!-- <div class="edit-content" v-if="contentItem">
          <div class="field">
            <label for="lang">
              Lang:
              <input type="text" v-model="contentItem.lang">
            </label>
          </div>
          <div class="field">
            <label for="token">
              Token:
              <input type="text" v-model="contentItem.token">
            </label>
          </div>
          <div class="field">
            <label for="value">
              Content: (
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>)
              <wysiwyg v-model="contentItem.value" v-if="showWysiwyg"/>
              <textarea
                v-model="contentItem.value"
                v-if="!showWysiwyg"
                style="width:100%;min-height:400px;"
              ></textarea>
            </label>
          </div>
          <a href="javascript:;" @click="updateContentItem">{{$t('update')}}</a>
        </div>-->
        <div class="edit-manuscript-content" v-if="msContentItem">
          <div class="field">
            <label for="value">
              Manuscript:
              <input type="text" v-model="msContentItem.manuscript" />
            </label>
          </div>
          <div class="field">
            <label for="lang">
              Lang:
              <input type="text" v-model="msContentItem.lang" />
            </label>
          </div>
          <div class="field">
            <label for="token">
              Token:
              <input type="text" v-model="msContentItem.token" />
            </label>
          </div>
          <div class="field">
            <label for="value">
              Content: (
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>) --
              <a href="javascript:;" @click="updateMSContentItem">{{$t('update')}}</a>
              <wysiwyg v-model="msContentItem.value" v-if="showWysiwyg" />
              <textarea
                v-model="msContentItem.value"
                v-if="!showWysiwyg"
                style="width:100%;min-height:400px;"
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api.js'
import axios from 'axios'
import {
  Timestamp,
  ServerTimestamp,
  StoreDB,
  auth
} from '~/plugins/firebase.js'
import manuscriptsManager from '~/manuscriptsManager'
import { reject } from 'q'
export default {
  data() {
    return {
      contentItem: null,
      msContentItem: null,
      translation: null,
      lang: 'en-US',
      manuscript: 'bnf150',
      showWysiwyg: true
    }
  },
  computed: {
    manuscript_content() {
      const unsorted = Object.assign(
        {},
        this.$store.state.content.manuscript_content
      )
      if (unsorted && unsorted.length) {
        return unsorted.sort((a, b) => {
          const textA = a.token.toUpperCase()
          const textB = b.token.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      }
      return unsorted
    }
  },
  head(){
//https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.full.min.js
  },
  methods: {
    async loadIntoFB() {
      fetch('/manuscripts/vatican44_2b.xlsx')
        .then(function(res) {
          /* get the data as a Blob */
          if (!res.ok) throw new Error('fetch failed')
          return res.arrayBuffer()
        })
        .then(function(ab) {
          /* parse the data when it is received */
          var data = new Uint8Array(ab)
          var workbook = XLSX.read(data, {
            type: 'array'
          })

          /******************************************************************
           * DO SOMETHING WITH workbook: Converting Excel value to Json       *
           ********************************************************************/
          var first_sheet_name = workbook.SheetNames[0]
          /* Get worksheet */
          var worksheet = workbook.Sheets[first_sheet_name]

          var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true })
          /************************ End of conversion ************************/

          console.log(_JsonData)
          let promises = []
          const self = this
          $.each(_JsonData, function(index, value) {
            if(index < 200){
promises.push(
              new Promise((resolve, reject) => {
                if(!value.AT){
                  debugger
                }
                StoreDB.collection(
                  `manuscripts/7QehBIZflpGBdqlO4HeS/lines`
                ).add({
                  AT: value.AT || '',
                  bottom_on_page: value.bottom,
                  general_index: index,
                  iiif_url: value.iiif_url,
                  left_on_page: value.left,
                  line: value.line,
                  page: value.page,
                  right_on_page: value.right,
                  top_on_page: value.top,
                  views: 0
                }).then(res => {
console.log(`line ${index} inserted`)
                })
                
              })
            )
            }
            
          })

          Promise.all(promises).then(res => {
            debugger
          })
        })
    },
    scoreGeneva() {
      // axios.get('https://us-central1-tikkoun-sofrim.cloudfunctions.net/score_ms?msId=KVqHkylpQFUvkQlQrP9U&from=0&to=2').then(function(res){
      //   debugger
      // })
    },
    // Manuscript content
    getManuscriptContent() {
      this.showWysiwyg = true
      this.$store.dispatch('content/getManuscriptContent', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },

    updateMSContentItem() {
      this.$store.dispatch('content/updateMSContentItem', this.msContentItem)
    },
    addMSContentItem() {
      this.$store.dispatch('content/addMSContentItem', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },
    editMSContentItem(msContentItem) {
      this.msContentItem = Object.assign({}, msContentItem)
    }
  }
}
</script>
<style scoped lang="scss">
.translation_tokens {
  list-style: none;
  padding: 0;
  max-height: 500px;
  overflow-y: auto;
  li {
  }
}
</style>
