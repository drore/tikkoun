import Vuex from 'vuex'
import api from '@/api.js'
import manuscriptsManager from '~/manuscriptsManager'

export const state = () => ({
  selected_line: null,
  manuscript: null,
  transcription: null
})

export const mutations = {
  gotLine(state, payload) {
    state.selected_line = payload
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
  manipulateLineByAdding(state, mark) {
    let transcription = state.transcription
    const range = state.selected_line.selected_range
    const pre = transcription.substring(0, range.end)
    const post = transcription.substring(range.end, state.transcription.length)

    state.transcription = `${pre}${mark}${post}`
  },
  manipulateLine(state, action) {
    let transcription = state.transcription
    const range = state.selected_line.selected_range
    const pre = transcription.substring(0, range.start)
    const post = transcription.substring(range.end, state.transcription.length)
    const selection = transcription.substring(range.start, range.end)

    switch (action) {
      case 'additions':
        transcription = `${pre}[${selection}]${post}`
        break
      case 'deletions':
        transcription = `${pre}(${selection})${post}`
        break
      case 'damaged':
        transcription = `${pre}<${selection}>${post}`
        break
      case 'uncertain':
        transcription = `${pre}{${selection}}${post}`
        break
      case 'upper':
        transcription = `${pre}${selection}˙${post}`
        break
      case 'ligature':
        transcription = `${pre}${selection}ﭏ${post}`
        break
    }

    state.transcription = transcription
  },
  updateTranscription(state, payload) {
    state.transcription = payload
  },
  setSelectedTextRange(state, payload) {
    state.selected_line.selected_range = payload
  },
  gotManuscript(state, payload) {
    const msData = payload.docs.map(d => {
      const obj = d.data()
      return Object.assign({ id: d.id }, obj)
    })[0]
    if (msData) {
      state.manuscript = msData
    }
  },
  resetTranscription(state) {
    state.transcription = state.selected_line.AT
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  INIT({ commit, dispatch }, manuscriptName) {
    dispatch('GET_MANUSCRIPT', manuscriptName)
  },
  resetTranscription({ commit }) {
    commit('resetTranscription')
  },
  setSelectedTextRange({ commit }, range) {
    commit('setSelectedTextRange', range)
  },
  updateTranscription({ commit }, value) {
    commit('updateTranscription', value)
  },
  manipulateLine({ commit }, action) {
    commit('manipulateLine', action)
  },
  manipulateLineByAdding({ commit }, mark) {
    commit('manipulateLineByAdding', mark)
  },
  async getUserLines({ commit, state }) {
    commit('gotUserLines', await api.getUserLines(state.user.uid))
  },
  async skip({ state, dispatch }) {
    const params = {
      uid: state.user.uid,
      lineId: state.selected_line.id,
      manuscript: state.manuscript.id,
      generalIndex: state.selected_line.general_index,
      isAnonymous: state.user.isAnonymous
    }
    dispatch('getNextLine', await api.markLineAsSkipped(params))
  },
  async addTranscription({ state, dispatch }) {
    const params = {
      uid: state.user.uid,
      lineId: state.selected_line.id,
      line: state.selected_line.line,
      page: state.selected_line.page,
      transcription: state.transcription,
      manuscript: state.manuscript.id,
      createdOn: new Date(),
      generalIndex: state.selected_line.general_index,
      isAnonymous: state.user.isAnonymous
    }
    dispatch('getNextLine', await api.addTranscription(params))
  },

  async GET_MANUSCRIPT({ commit }, name) {
    commit('gotManuscript', await api.getManuscript(name))
  },

  updateLineViewing({ commit, state }, params) {
    api.updateLineViewing(state.manuscript.id, params)
  },
  async getNextLine({ commit, dispatch, state }) {
    let promise
    // In case it is already seeded
    if (state.selected_line) {
      promise = manuscriptsManager.getNextLine(
        state.manuscript.id,
        state.selected_line.general_index
      )
    } else {
      // For the specific user!
      // First look at the user profile, see if we have his last line
      const userNextLine = await api.getUserNextLine(
        state.manuscript.id,
        state.user.uid
      )

      if (userNextLine) {
        // Now, is this line matches the conditions? (less then 20 actions)
        const res = await api.getLineByGeneralIndex(
          state.manuscript.id,
          userNextLine
        )

        if (res.data && res.data.views + res.data.transcriptions < 20) {
          // This is just to keep the structure, maybe better impl. is possible
          promise = new Promise(resolve => {
            resolve(res)
          })
        } else {
          // If not, take the next line from the manuscript object
          promise = manuscriptsManager.getLine(
            state.manuscript.id,
            state.manuscript.next_page,
            state.manuscript.next_line
          )
        }
      } else {
        promise = manuscriptsManager.getLine(
          state.manuscript.id,
          state.manuscript.next_page,
          state.manuscript.next_line
        )
      }
    }

    // Execute the promise
    promise.then(res => {
      dispatch('updateLineViewing', {
        lineId: res.id,
        viewCounter: res.data.views || 0,
        uid: state.user.uid
      })
      commit('gotLine', Object.assign({ id: res.id }, res.data))
    })
  },
  getLine({ commit, dispatch, state }) {
    manuscriptsManager
      .getLine(
        state.manuscript.id,
        state.manuscript.next_page,
        state.manuscript.next_line
      )
      .then(res => {
        dispatch('updateLineViewing', {
          lineId: res.id,
          viewCounter: res.data.views || 0
        })
        commit('gotLine', Object.assign({ id: res.id }, res.data))
      })
  },
  loginShowSection({ commit }, section) {
    commit('loginShowSection', section)
  }
}

export const getters = {}
