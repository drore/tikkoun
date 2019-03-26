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
      </div>
    </div>
    <div class="content p-2">
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
            Content:
            <wysiwyg v-model="msContentItem.value"/>
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
            Value:
            <input type="text" v-model="translation.value">
          </label>
        </div>
        <a href="javascript:;" @click="updateTranslation">{{$t('update')}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { StoreDB } from '~/plugins/firebase.js'
export default {
  data() {
    return { msContentItem: null, translation: null, lang: 'en-US' }
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
      this.$store.dispatch('getManuscriptContent')
    },
    updateMSContentItem() {
      this.$store.dispatch('updateMSContentItem', this.msContentItem)
    },
    addMSContentItem() {
      this.$store.dispatch('addMSContentItem', this.lang)
    },
    editMSContentItem(msContentItem) {
      this.msContentItem = msContentItem
    },
    // Translations
    getTranslations() {
      this.$store.dispatch('getTranslations', this.lang)
    },
    updateTranslation() {
      this.$store.dispatch('updateTranslation', this.translation)
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
