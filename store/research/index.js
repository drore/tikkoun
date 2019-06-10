import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'

export const state = () => ({
  research:{},
  userTemperament:null
})

export const mutations = {
  updatedUserTemperament(state, payload) {
    debugger
  },
  gotUserTemperament(state, payload){
    state.userTemperament = payload
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  async getUserTemperament({commit}, uid){
    const userTemperament = await api.getUserTemperament(uid)
    commit('gotUserTemperament',userTemperament);
  },
  async updateUserTemperament ({ commit }, params) {
    // Calculate type
    // Calc avg
    const userTraits = {
      conscientiousness:"N",
      openness:"N",
    }

    const ConscientiousnessAvg = (params.research.q_1 + (8-params.research.q_3))/2
    const OpennessAvg = (params.research.q_2 + (8-params.research.q_4))/2

    if(ConscientiousnessAvg >= 6){
      userTraits.conscientiousness = "C"
    }
    else if(ConscientiousnessAvg <= 2){
      userTraits.conscientiousness = "U"
    }

    if(OpennessAvg >= 6){
      userTraits.openness = "O"
    }
    else if(OpennessAvg <= 2){
      userTraits.openness = "D"
    }

    commit('updatedUserTemperament', await api.updateUserTemperament({uid:params.uid, userTraits:userTraits}))
  },

}

export const getters = {}
