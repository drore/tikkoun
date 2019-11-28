import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'

export const state = () => ({
  userStats:{daily:{}},
  leaders:[]
})

export const mutations = {
  gotUserDailyMSStats(state, payload) {
    state.userStats.daily = payload
  },
  gotLeaderBoard(state, payload) {
    state.leaders = payload
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  async getUserDailyMSStats({ commit }, params) {
    commit('gotUserDailyMSStats', await api.getUserDailyMSStats(params.uid))
  },
  async getLeaderBoard({ commit }, params) {
    commit('gotLeaderBoard', await api.getLeaderBoard(params))
  },
}

export const getters = {}
