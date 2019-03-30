<template>
  <div class="row">
    <div class="sidebar col-3">
      <div class="accordion" id="sidebarAccordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >{{$t('translations')}}</button>
            </h5>
          </div>

          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
              <a href="javascript:;" @click="getTranslations">{{$t('get_translations')}}</a>
              <hr>
              <select name="langs" v-model="lang" @change="getTranslations">
                <option
                  :value="locale.iso"
                  v-for="locale in this.$i18n.locales"
                  :key="locale.code"
                >{{ $t(`lang.${locale.code}`) }}</option>
              </select>
              <a href="javascript:;" @click="addTranslation">{{$t('add')}}</a>
              <hr>
              <div v-if="translations">
                <ul class="translation_tokens">
                  <li
                    v-for="translation in translations"
                    @click="editTranslation(translation)"
                  >{{translation.token}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingContent">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseContent"
                aria-expanded="false"
                aria-controls="collapseContent"
              >{{$t('content')}}</button>
            </h5>
          </div>
          <div
            id="collapseContent"
            class="collapse"
            aria-labelledby="headingContent"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
              <a href="javascript:;" @click="getContent">{{$t('get_content')}}</a>
              <hr>
              <select name="langs" v-model="lang" @change="getContent">
                <option
                  :value="locale.iso"
                  v-for="locale in this.$i18n.locales"
                  :key="locale.code"
                >{{ $t(`lang.${locale.code}`) }}</option>
              </select>
              <a href="javascript:;" @click="addContentItem">{{$t('add')}}</a>
              <div v-if="content">
                <hr>
                <ul class="content_tokens">
                  <li
                    v-for="contentItem in content"
                    @click="editContentItem(contentItem)"
                  >{{contentItem.token}}</li>
                </ul>
              </div>
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
                    v-for="contentItem in manuscript_content"
                    @click="editMSContentItem(contentItem)"
                  >{{contentItem.token}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
              <a href="javascript:;" @click="tsvJSON">{{$t('tsv_to_json')}}</a>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content col-9">
      <div class="p-2">
        <div class="edit-content" v-if="contentItem">
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
        </div>
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
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>)
              <wysiwyg v-model="msContentItem.value" v-if="showWysiwyg"/>
              <textarea
                v-model="msContentItem.value"
                v-if="!showWysiwyg"
                style="width:100%;min-height:400px;"
              ></textarea>
            </label>
          </div>
          <a href="javascript:;" @click="updateMSContentItem">{{$t('update')}}</a>
        </div>
        <div class="edit-translation" v-if="translation">
          <div class="field">
            <label for="lang">
              Lang:
              <input type="text" v-model="translation.lang">
            </label>
          </div>
          <div class="field">
            <label for="token">
              Token:
              <input type="text" v-model="translation.token">
            </label>
          </div>
          <div class="field">
            <label for="value">
              Value: (
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>)
              <wysiwyg v-model="translation.value" v-if="showWysiwyg"/>
              <textarea
                v-model="translation.value"
                v-if="!showWysiwyg"
                style="width:100%;min-height:400px;"
              ></textarea>
            </label>
          </div>

          <a href="javascript:;" @click="updateTranslation">{{$t('update')}}</a>
          <a href="javascript:;" @click="duplicateTranslation">{{$t('duplicate')}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { StoreDB } from '~/plugins/firebase.js'
import manuscriptsManager from '~/manuscriptsManager'
export default {
  data() {
    return {
      contentItem: null,
      msContentItem: null,
      translation: null,
      lang: 'en-US',
      manuscript: 'geneva',
      showWysiwyg: true
    }
  },
  computed: {
    manuscript_content() {
      const unsorted = this.$store.state.manuscript_content
      if (unsorted && unsorted.length) {
        return unsorted.sort((a, b) => {
          const textA = a.token.toUpperCase()
          const textB = b.token.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      }
      return unsorted
    },
    content() {
      const unsorted = this.$store.state.content
      if (unsorted && unsorted.length) {
        return unsorted.sort((a, b) => {
          const textA = a.token.toUpperCase()
          const textB = b.token.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      }
      return unsorted
    },
    translations() {
      const unsorted = this.$store.state.translations
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
      this.$store.dispatch('getManuscriptContent', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },
    //var tsv is the TSV file with headers
    async tsvJSON() {
      const tsv = await manuscriptsManager.getManuscriptTSV('BNF150_all_data_for_alan')
      debugger
      if(tsv){
        const lines = tsv.split('\n')

      const result = []

      const headers = lines[0].split('\t')

      for (var i = 1; i < lines.length; i++) {
          const obj = {}
          const currentline = lines[i].split('\t')

          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
          }

          result.push(obj)
          }
       debugger
       //return result; //JavaScript object
        return JSON.stringify(result) //JSON
      }
      
    },
    updateMSContentItem() {
      this.$store.dispatch('updateMSContentItem', this.msContentItem)
    },
    addMSContentItem() {
      this.$store.dispatch('addMSContentItem', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },
    editMSContentItem(msContentItem) {
      this.msContentItem = msContentItem
    },
    // General content
    getContent() {
      this.showWysiwyg = true
      this.$store.dispatch('getContent', this.lang)
    },
    updateContentItem() {
      this.$store.dispatch('updateContentItem', this.contentItem)
    },
    addContentItem() {
      this.$store.dispatch('addContentItem', this.lang)
    },
    editContentItem(contentItem) {
      this.contentItem = contentItem
    },
    // Translations
    getTranslations() {
      this.showWysiwyg = false
      this.$store.dispatch('getTranslations', this.lang)
    },
    updateTranslation() {
      this.$store.dispatch('updateTranslation', this.translation)
    },
    duplicateTranslation() {
      this.$store.dispatch(
        'duplicateTranslation',
        Object.assign({}, this.translation)
      )
    },
    addTranslation() {
      this.$store.dispatch('addTranslation', this.lang)
    },
    editTranslation(translation) {
      this.translation = translation
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
