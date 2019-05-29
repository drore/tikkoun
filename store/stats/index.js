import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'

export const state = () => ({
  userStats:{}
})

export const mutations = {
  gotUserStats(state, payload) {
    
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  async getUserStats({ commit }, uid) {
    commit('gotUserStats', await api.getUserStats(uid))
  },

}

export const getters = {}
