import api from '@/api.js'

export const state = () => ({
  translations: null
})

export const mutations = {
  duplicateTranslation(state, payload) {
    if (state.translations) {
      state.translations.push({
        token: `[temp] ${payload.token}`,
        value: payload.value,
        lang: payload.lang
      })
    }
  },
  addTranslation(state, payload) {
    if (state.translations) {
      state.translations.push({
        token: 'temp_' + new Date().getTime(),
        value: null,
        lang: payload
      })
    }
  },
  gotTranslations(state, payload) {
    state.translations = payload.docs.map(d => {
      const data = d.data()
      return {
        id: d.id,
        token: data.token,
        lang: data.lang,
        value: data.value
      }
    })
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  async getTranslations({ commit }, lang) {
    commit('gotTranslations', await api.getTranslations(lang))
  },
  addTranslation({ commit }, lang) {
    commit('addTranslation', lang)
  },
  duplicateTranslation({ commit }, translation) {
    commit('duplicateTranslation', translation)
  },
  async updateTranslation({ dispatch }, translation) {
    dispatch('translations/getTranslations', await api.updateTranslation(translation))
  }
}

export const getters = {}
