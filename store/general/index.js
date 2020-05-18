import api from '@/api.js'

export const state = () => ({
  manuscripts: [],
  env: 'prod',
  help_section: null,
  help_sub_section: null,
  help_ui: 'docked',
  help_shown: false,
  expert_mode: false
})

export const mutations = {
  gotManuscripts(state, payload) {
    state.manuscripts = payload
  },
  toggleExpertMode(state) {
    state.expert_mode = !state.expert_mode
  },
  changeHelpUI(state, payload) {
    state.help_ui = payload
  },

  setEnv(state, payload) {
    state.env = payload
  },
  showHelp(state, payload) {
    state.help_shown = payload
  },
  showHelpSection(state, payload) {
    const helpParts = payload && payload.split('__')
    if (!helpParts || !helpParts.length) {
      state.help_section = payload
    } else {
      state.help_section = helpParts[0]
      state.help_sub_section = helpParts[1]
    }
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  showHelpSection({ commit }, section) {
    commit('showHelpSection', section)
  },

  toggleExpertMode({ commit }) {
    commit('toggleExpertMode')
  },
  changeHelpUI({ commit }, ui) {
    commit('changeHelpUI', ui)
  },
  showHelp({ commit }, show) {
    commit('showHelp', show)
  },
  async getInitialData({ commit }) {
    if (window.location.host.indexOf('demo') != -1) {
      commit('setEnv', 'demo')
    }

    // Manuscripts
    let manuscripts
    const manuscriptsFromLS = localStorage.getItem('manuscripts')
    if (!manuscriptsFromLS) {
      manuscripts = await api.getManuscripts()
      localStorage.setItem('manuscripts', JSON.stringify(manuscripts))
    } else {
      manuscripts = JSON.parse(manuscriptsFromLS)
    }
    commit('gotManuscripts', manuscripts)
  }
}

export const getters = {}
