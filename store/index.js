import Vuex from 'vuex'
import { auth, GoogleProvider } from '@/plugins/firebase.js'
import api from '@/api.js'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      translations: null,
      login: {
        shown_section: 'login'
      },
      manuscript: {
        attribution: '',
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
      loginShowSection(state, payload) {
        state.login.shown_section = payload
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
      setTranslations(state, payload) {
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
      loginShowSection({ commit }, section) {
        commit('loginShowSection', section)
      },
      async getTranslations({ commit }, lang) {
        commit('setTranslations', await api.getTranslations(lang))
      },
      addTranslation({ commit }, lang) {
        commit('addTranslation', lang)
      },
      async updateTranslation({ commit, dispatch }, translation) {
        await api.updateDocument('translations', translation.id, translation)

        dispatch('getTranslations', translation.lang)
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
