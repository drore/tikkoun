import Vuex from 'vuex'
import { auth, GoogleProvider } from '@/plugins/firebase.js'
import api from '@/api.js'
import manuscriptsManager from '~/manuscriptsManager'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      translations: null,
      manuscript_content: {},
      login: {
        shown_section: 'login'
      },
      manuscript: {
        name: 'Geneva',
        short_desc: 'sd',
        desc_link: 'dl',
        attribution: '',
        selected_line: null,
        total_pages: 'xx',
        total_lines: 'xx',
        line_num: 'xx',
        page_num: 'xx',
        page: {
          img_src: '',
          line: {
            polygon: {
              top_left: { x: 0, y: 0 },
              top_right: { x: 0, y: 0 },
              bottom_left: { x: 0, y: 0 },
              bottom_right: { x: 0, y: 0 }
            }
          }
        }
      }
    }),
    mutations: {
      setUser(state, payload) {
        state.user = payload
      },
      gotLine(state, payload) {
        state.manuscript.selected_line = payload
      },
      loginShowSection(state, payload) {
        state.login.shown_section = payload
      },
      addMSContentItem(state, payload) {
        if (state.manuscript_contents) {
          state.manuscript_contents.push({
            token: 'temp_' + new Date().getTime(),
            value: null,
            lang: payload.lang,
            manuscript: payload.manuscript
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
      gotManuscriptContent(state, payload) {
        state.manuscript_content = payload.docs.map(d => {
          const data = d.data()
          return {
            id: d.id,
            token: data.token,
            lang: data.lang,
            manuscript: data.manuscript,
            value: data.value
          }
        })
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
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {},
      loginAnonymously({ commit }) {
        auth.signInAnonymously().catch(function(error) {
          commit('loginError', error)
        })
      },
      async getManuscriptContent({ commit }, manuscript) {
        commit(
          'gotManuscriptContent',
          await api.getManuscriptContent(manuscript)
        )
      },
      addMSContentItem({ commit }, lang) {
        commit('addMSContentItem', { lang: lang, manuscript: 'geneva' })
      },
      async updateMSContentItem({ dispatch }, content) {
        dispatch('getManuscriptContent', await api.updateMSContentItem(content))
      },
      getLine({ commit }, params) {
        manuscriptsManager.getRandomLine().then(res => {
          commit('gotLine', res)
        })
      },
      loginShowSection({ commit }, section) {
        commit('loginShowSection', section)
      },
      async getTranslations({ commit }, lang) {
        commit('gotTranslations', await api.getTranslations(lang))
      },
      addTranslation({ commit }, lang) {
        commit('addTranslation', lang)
      },
      async updateTranslation({ dispatch }, translation) {
        dispatch('getTranslations', await api.updateTranslation(translation))
      },
      autoSignIn({ commit }, payload) {
        commit('setUser', payload)
      },
      signInWithGoogle({ commit }) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut({ commit }) {
        auth
          .signOut()
          .then(() => {
            commit('setUser', null)
            window.location.reload()
          })
          .catch(err => console.log(err))
      }
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    }
  })
}

export default createStore
