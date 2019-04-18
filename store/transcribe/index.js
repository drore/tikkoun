import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'

export const state = () => ({
  selected_line: null,
  next_line: null,
  prev_line: null,
  manuscript: null,
  transcription: null
})

export const mutations = {
  gotLine(state, payload) {
    state.selected_line = Object.assign(
      {
        selected_range: {
          start: 0,
          end: 0
        }
      },
      payload
    )
  },
  gotPrevLine(state, payload) {
    state.prev_line = payload
  },
  gotNextLine(state, payload) {
    state.next_line = payload
  },
  manipulateLineByAdding(state, mark) {
    let transcription = state.transcription
    state.transcription = `${transcription}${mark}`
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
  clear(state) {
    state.selected_line = null;
    state.manuscript = null
    state.next_line = null
    state.prev_line = null
    state.transcription = null
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
  clear({ commit }) {
    commit('clear')
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
  async getUserLines({ dispatch }, uid) {
    dispatch('auth/gotUserLines', await api.getUserLines(uid))
  },
  async addTranscription({ state, dispatch }, params) {
    const user = params.user
    const transcription = {
      uid: user.uid,
      lineId: state.selected_line.id,
      line: state.selected_line.line,
      page: state.selected_line.page,
      transcription: state.transcription,
      manuscript: state.manuscript.id,
      createdOn: new Date(),
      generalIndex: state.selected_line.general_index,
      isAnonymous: user.isAnonymous,
      skipped: !!params.skipped
    }
    dispatch('getNextLine', await api.addTranscription(transcription))
  },

  async GET_MANUSCRIPT({ commit }, name) {
    commit('gotManuscript', await api.getManuscript(name))
  },

  updateLineViewing({ commit, state }, params) {
    api.updateLineViewing(state.manuscript.id, params)
  },
  async getNextLine({ commit, dispatch, state }, uid) {
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
      const userNextLineGeneralIndex = await api.getUserNextLine(
        state.manuscript.id,
        uid
      )
      if (userNextLineGeneralIndex) {
        // Now, is this line matches the conditions? (less then 20 actions)
        const res = await api.getLineByGeneralIndex(
          state.manuscript.id,
          userNextLineGeneralIndex
        )

        if (res.data && res.data.transcriptions < 5) {
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
        // If no next line is on the user, go by the user's last line
        const lastUserLine = await api.getUserLastLine(state.manuscript.id, uid)

        if (lastUserLine) {
          const lineObj = await api.getLine(
            state.manuscript.id,
            lastUserLine.page,
            lastUserLine.line
          )

          const res = await api.getLineByGeneralIndex(
            state.manuscript.id,
            lineObj.general_index + 1
          )

          if (res.data && res.data.transcriptions < 5) {
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
    }

    // Execute the promise
    promise.then(res => {
      dispatch('updateLineViewing', {
        lineId: res.id,
        viewCounter: res.data.views || 0,
        uid: uid
      })
      commit('gotLine', Object.assign({ id: res.id }, res.data))
    })
  },
  getLine({ commit, dispatch, state }, params) {
    manuscriptsManager
      .getLine(params.msId, params.page, params.line)
      .then(res => {
        dispatch('updateLineViewing', {
          lineId: res.id,
          viewCounter: res.data.views || 0
        })

        commit('gotLine', Object.assign({ id: res.id }, res.data))
      })
  }
}

export const getters = {}
