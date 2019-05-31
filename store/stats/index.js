import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'

export const state = () => ({
  userStats:{daily:{}}
})

export const mutations = {
  gotUserDailyMSStats(state, payload) {
    state.userStats.daily = payload
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  async getUserDailyMSStats({ commit }, params) {
    commit('gotUserDailyMSStats', await api.getUserDailyMSStats(params.uid))
  },

}

export const getters = {}
