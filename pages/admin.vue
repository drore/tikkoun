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
              <!-- <a href="javascript:;" @click="tsvJSON">{{$t('tsv_to_json')}}</a>-->
              <a href="javascript:;" @click="loadIntoFB">Load into firebase</a>
              <hr>
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
              <hr>
              <select name="langs" v-model="lang" @change="getManuscriptContent">
                <option
                  :value="locale.iso"
                  v-for="locale in this.$i18n.locales"
                  :key="locale.code"
                >{{ $t(`lang.${locale.code}`) }}</option>
              </select>
              <a href="javascript:;" @click="addMSContentItem">{{$t('add')}}</a>
              <div v-if="manuscript_content">
                <hr>
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
              <input type="text" v-model="msContentItem.manuscript">
            </label>
          </div>
          <div class="field">
            <label for="lang">
              Lang:
              <input type="text" v-model="msContentItem.lang">
            </label>
          </div>
          <div class="field">
            <label for="token">
              Token:
              <input type="text" v-model="msContentItem.token">
            </label>
          </div>
          <div class="field">
            <label for="value">
              Content: (
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>) --
              <a href="javascript:;" @click="updateMSContentItem">{{$t('update')}}</a>
              <wysiwyg v-model="msContentItem.value" v-if="showWysiwyg"/>
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
import firebase from '~/plugins/firebase'
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
  methods: {
    // Manuscript content
    getManuscriptContent() {
      this.showWysiwyg = true
      this.$store.dispatch('content/getManuscriptContent', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },

    async loadIntoFB() {
      const lines = await StoreDB.collection(
        'manuscripts/KVqHkylpQFUvkQlQrP9U/lines'
      )
        .where('transcriptions', '==', 0)
        .get()
      console.log(lines.size)
      for (let i = 0; i < lines.size; i++) {
        const lineDoc = lines.docs[i]
        const lineData = lineDoc.data()
        const transcriptions = await StoreDB.collection('transcriptions')
          .where('manuscript', '==', 'KVqHkylpQFUvkQlQrP9U')
          .where('page', '==', lineData.page)
          .where('line', '==', lineData.line)
          .get()

        if (transcriptions.size) {
          await lineDoc.ref.update({ transcriptions: transcriptions.size })
          console.log('++ updated', i, transcriptions.size)
        } else {
          console.log('-- skipped', i)
        }
      }
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
