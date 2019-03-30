import Vuex from 'vuex'
import { auth, GoogleProvider } from '@/plugins/firebase.js'
import api from '@/api.js'
import manuscriptsManager from '~/manuscriptsManager'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      translations: null,
      manuscript_content: [],
      content: [],
      login: {
        shown_section: 'login',
        error: null
      },
      selected_line: null,
      manuscript: null
    }),
    mutations: {
      setUser(state, payload) {
        state.user = payload
      },
      gotLine(state, payload) {
        state.selected_line = payload
      },
      loginShowSection(state, payload) {
        state.login.shown_section = payload
      },
      // General content
      gotContent(state, payload) {
        state.content = payload.docs.map(d => {
          const data = d.data()
          return {
            id: d.id,
            token: data.token,
            lang: data.lang,
            value: data.value
          }
        })
      },
      addContentItem(state, payload) {
        if (state.content) {
          state.content.push({
            token: 'temp_' + new Date().getTime(),
            value: null,
            lang: payload.lang
          })
        }
      },
      // Manuscript content
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
      addMSContentItem(state, payload) {
        if (state.manuscript_content) {
          state.manuscript_content.push({
            token: 'temp_' + new Date().getTime(),
            value: null,
            lang: payload.lang,
            manuscript: payload.manuscript
          })
        }
      },
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
      loginError(state, payload) {
        state.login.error = payload.message
      },
      gotUserLines(state, payload) {
        state.user.userLines = payload.docs.map(d => {
          const data = d.data()
          return {
            id: d.id,
            line: data.line,
            page: data.page,
            manuscript: data.manuscript,
            transcription: data.transcription
          }
        })
      },
      gotManuscript(state, payload) {
        state.manuscript = payload.docs.map(d => d.data())[0]
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
      },
      updatedContentItem(state, payload) {
        const mc = state.content.find(mc => {
          return mc.id === payload.id
        })

        const indexToUpdate = state.content.indexOf(mc)

        state.content[indexToUpdate] = Object.assign(
          state.content[indexToUpdate],
          payload
        )
      },
      updatedMSContentItem(state, payload) {
        const mc = state.manuscript_content.find(mc => {
          return mc.id === payload.id
        })

        const indexToUpdate = state.manuscript_content.indexOf(mc)

        state.manuscript_content[indexToUpdate] = Object.assign(
          state.manuscript_content[indexToUpdate],
          payload
        )
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {},
      loginAnonymously({ commit }) {
        auth.signInAnonymously().catch(function(error) {
          commit('loginError', error)
        })
      },
      async getUserLines({ commit, state }) {
        commit('gotUserLines', await api.getUserLines(state.user.uid))
      },
      async addTranscription({ commit, state, dispatch }, transcription) {
        const params = {
          uid: state.user.uid,
          line: state.manuscript.selected_line.line,
          page: state.manuscript.selected_line.page,
          transcription: transcription,
          manuscript: state.manuscript.name,
          createdOn: new Date()
        }
        dispatch('getLine', await api.addTranscription(params))
      },
      // General content
      async getContent({ commit }, lang) {
        commit('gotContent', await api.getContent(lang))
      },
      addContentItem({ commit }, lang) {
        commit('addContentItem', { lang: lang })
      },
      async updateContentItem({ commit, dispatch }, content) {
        await api.updateContentItem(content)
        commit('updatedContentItem', content)
      },
      // Manuscript content
      async getManuscriptContent({ commit }, params) {
        commit(
          'gotManuscriptContent',
          await api.getManuscriptContent(params.lang, params.manuscript)
        )
      },
      async GET_MANUSCRIPT({ commit }, params) {
        commit(
          'gotManuscript',
          await api.getManuscript(params)
        )
      },
      addMSContentItem({ commit }, params) {
        commit('addMSContentItem', params)
      },
      async updateMSContentItem({ commit, dispatch }, content) {
        await api.updateMSContentItem(content)
        commit('updatedMSContentItem', content)
      },
      getLine({ commit, state }) {
        manuscriptsManager
          .getRandomLine(state.manuscript.name)
          .then(res => {
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
      duplicateTranslation({ commit }, translation) {
        commit('duplicateTranslation', translation)
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
      signInWithEmail({ commit }, params) {
        return new Promise((resolve, reject) => {
          auth
            .createUserWithEmailAndPassword(params.email, params.password)
            .catch(err => {
              commit('loginError', err)
            })

          resolve()
        })
      },
      createUserWithEmailAndPassword({ commit }, params) {
        auth
          .createUserWithEmailAndPassword(params.email, params.password)
          .catch(function(error) {
            debugger
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // ...
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
