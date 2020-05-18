import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'
import { STATUS_CODES } from 'http'

export const state = () => ({
  selected_line: null,
  next_line: null,
  prev_line: null,
  manuscript: null,
  transcription: null,
  task: null,
  hide_task: false
})

export const mutations = {
  setRange(state, payload) {
    state.range = payload
  },
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
  setTask(state, payload) {
    state.task = payload
    if (!payload) {
      // Also clear the selected_line and other params
      state.selected_line = null
      state.next_line = null
      state.prev_line = null
      state.transcription = null
      state.range = null
    }
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
      case 'divine_name':
        const divine_name_char =
          state.manuscript.special_char['divine_name'] || 'ײ'
        transcription = `${pre}${divine_name_char}${post}`
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
    state.selected_line = null
    state.manuscript = null
    state.next_line = null
    state.prev_line = null
    state.transcription = null
    state.task = null
    state.range = null
  },
  gotManuscript(state, payload) {
    state.manuscript = payload
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

    if (user.transcribe_mode === 'tasks' && state.task && state.task.id) {
      transcription.task = state.task.id
      transcription.rangeId = state.range.id
    }

    await api.addTranscription(transcription)

    dispatch('getNextLine', { uid: user.uid, isAnonymous: user.isAnonymous })
  },

  async GET_TASK({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      if (!state.task) {
        commit('setTask', await api.getActiveTask())
      }
      resolve()
    })
  },
  async getManuscriptById({ commit }, id) {
    const manuscript = await api.getManuscriptById(id)
    commit('gotManuscript', manuscript)
  },
  async GET_MANUSCRIPT({ commit }, name) {
    const manuscript = await api.getManuscript(name)
    commit('gotManuscript', manuscript)
  },

  updateLineViewing({ commit, state }, params) {
    api.updateLineViewing(state.manuscript.id, params)
  },
  async getNextLine({ commit, dispatch, state }, params) {
    let promise
    const transcribe_mode = localStorage.getItem('transcribe_mode')
    if (!state.selected_line && state.task && transcribe_mode === 'tasks') {
      console.log('Go grab a task line')
      return dispatch('getTaskLine', params)
    } else {
      console.log(
        'We continue with the current streak',
        `Transcribe mode is: ${transcribe_mode}`
      )
      // In case it is already seeded - meaning -> in active session
      if (state.selected_line) {
        // Just go to the next line
        promise = manuscriptsManager.getNextLine(
          state.manuscript.id,
          state.selected_line.general_index
        )
      } else {
        // For the specific user!
        // First look at the user profile, see if we have his last line
        const userNextLineGeneralIndex = await api.getUserNextLine(
          state.manuscript.id,
          params.uid
        )

        if (userNextLineGeneralIndex) {
          // Now, is this line matches the conditions? (less then 20 actions)
          const res = await api.getLineByGeneralIndex(
            state.manuscript.id,
            userNextLineGeneralIndex
          )
          //
          if (
            res.data &&
            res.data.transcriptions < state.manuscript.consensus
          ) {
            // This is just to keep the structure, maybe better impl. is possible
            promise = new Promise(resolve => {
              resolve(res)
            })
          } else {
            // If not, take the next line from the manuscript object

            promise = manuscriptsManager.getLine(
              state.manuscript.id,
              state.manuscript.next_page,
              state.manuscript.next_line,
              params.uid
            )
          }
        } else {
          // If no next line is on the user, go by the user's last line
          const lastUserLine = await api.getUserLastLine(
            state.manuscript.id,
            params.uid
          )

          if (lastUserLine) {
            const lineObj = await api.getLine(
              state.manuscript.id,
              lastUserLine.page,
              lastUserLine.line,
              params.uid
            )

            const res = await api.getLineByGeneralIndex(
              state.manuscript.id,
              lineObj.general_index + 1
            )

            if (
              res.data &&
              res.data.transcriptions < state.manuscript.consensus
            ) {
              // This is just to keep the structure, maybe better impl. is possible
              promise = new Promise(resolve => {
                resolve(res)
              })
            } else {
              // If not, take the next line from the manuscript object

              promise = manuscriptsManager.getLine(
                state.manuscript.id,
                state.manuscript.next_page,
                state.manuscript.next_line,
                params.uid
              )
            }
          } else {
            promise = manuscriptsManager.getLine(
              state.manuscript.id,
              state.manuscript.next_page,
              state.manuscript.next_line,
              params.uid
            )
          }
        }
      }

      // Execute the promise
      promise.then(res => {
        dispatch('updateLineViewing', {
          lineId: res.id,
          viewCounter: res.data.views || 0,
          uid: params.uid
        })
        commit('gotLine', Object.assign({ id: res.id }, res.data))
      })
    }
  },
  backToRegularTranscribing(uid) {
    // If so, take the user out of the "tasks" routine and give the next line
    dispatch('auth/setUserTranscribeMode', 'regular', { root: true })
    // Clear the task from the state obj
    commit('setTask', null)

    dispatch('getNextLine', uid)
  },
  async getTaskLine({ commit, dispatch, state }, params) {
    let ranges = state.task.ranges
    // TODO : cache
    const userTask = await api.getUserTask(
      state.task.id,
      params.uid,
      params.isAnonymous
    )
    dispatch('auth/setUserTask', userTask, { root: true })

    let rangeId
    ranges = ranges.filter(r => r.donePercentage < 100)
    const range =
      ranges.length &&
      ((userTask &&
        ranges.find((r, i) => {
          rangeId = r.id

          return (
            !userTask.next_general_index ||
            !userTask.next_general_index[rangeId] ||
            userTask.next_general_index[rangeId] <= r.end_general_index
          )
        })) ||
        ranges.find(r => r.id == rangeId) ||
        ranges[0])

    if (range) {
      let userNextTaskGeneralIndex =
        (userTask &&
          userTask.next_general_index &&
          userTask.next_general_index[rangeId]) ||
        range.start_general_index

      // If the next general index on the user task does not go beyond the task
      if (userNextTaskGeneralIndex < range.end_general_index) {
        // If the userNextGeneralIndex point to a line that has been transcribed enough times already
        let i = userNextTaskGeneralIndex

        if (
          range.linesCount[userNextTaskGeneralIndex] &&
          range.linesCount[userNextTaskGeneralIndex] >= range.consensus
        ) {
          i = range.start_general_index
          // grab the next line from the range
          for (; i++; i < range.end_general_index) {
            if (range.linesCount[i] && range.linesCount[i] < range.consensus) {
              userNextTaskGeneralIndex = i
              break
            }
          }
        }

        console.log(
          `Line general index: ${userNextTaskGeneralIndex}, ms: ${range.msName}`
        )
        // We got it
        if (userNextTaskGeneralIndex === i) {
          const userNextTaskLine = await api.getLineByGeneralIndex(
            range.msId,
            userNextTaskGeneralIndex
          )

          // Now, are we on the right manuscript?
          if (range.msId !== state.manuscript) {
            await dispatch('getManuscriptById', range.msId)
          }

          commit(
            'gotLine',
            Object.assign({ id: userNextTaskLine.id }, userNextTaskLine.data)
          )
          commit('setRange', range)
        } else {
          // We are probably done
          this.backToRegularTranscribing(params.uid)
        }
      } else {
        this.backToRegularTranscribing(params.uid)
      }
    } else {
      console.error('Task has no range, please contact tikkoun support')
    }
  },
  getLine({ commit, dispatch, state }, params) {
    manuscriptsManager
      .getLine(params.msId, params.page, params.line, params.uid)
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
