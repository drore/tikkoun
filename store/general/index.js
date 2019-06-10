import manuscriptsManager from '~/manuscriptsManager'
import api from '@/api.js'

export const state = () => ({
  manuscripts: [],
  env:"prod"
})

export const mutations = {
  gotManuscripts(state, payload) {
    state.manuscripts = payload
  },
  setEnv(state, payload) {
    state.env = payload
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
  },
  async getInitialData({ commit }) {
    if(window.location.host.indexOf('demo') != -1){
      commit("setEnv",'demo')
    }
    
    // Manuscripts
    let manuscripts;
    const manuscriptsFromLS = localStorage.getItem('manuscripts')
    if (!manuscriptsFromLS) {
      manuscripts = await api.getManuscripts()
      localStorage.setItem('manuscripts', JSON.stringify(manuscripts))
    }
    else{
      manuscripts = JSON.parse(manuscriptsFromLS)
    }
    commit("gotManuscripts", manuscripts)
  },

}

export const getters = {}
