<template>
  <div class="row container">
    <div class="sidebar col-3">
      <div class="links">
        <a href="javascript:;" @click="getTranslations">{{$t('translations')}}</a>
      </div>
      <hr>
      <div class="master">
        <div v-if="translations">
          <select name="langs" id="langs_switcher" v-model="lang" @change="getTranslations">
            <option
              :value="locale.iso"
              v-for="locale in this.$i18n.locales"
              :key="locale.code"
            >{{ $t(`lang.${locale.code}`) }}</option>
          </select>
          <a href="javascript:;" @click="addTranslation">{{$t('add')}}</a>
          <ul class="translation_tokens">
            <li
              v-for="translation in translations"
              @click="editTranslation(translation)"
            >{{translation.token}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
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
    return { translation: null, lang: 'en-US' }
  },
  computed: {
    translations() {
      return this.$store.state.translations
    }
  },
  methods: {
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
  li {
  }
}
</style>
