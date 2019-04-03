import { auth, GoogleProvider } from '@/plugins/firebase.js'
import api from '@/api.js'

export const state = () => ({
  user: null,
  login: {
    shown_section: 'login',
    error: null
  }
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  loginError(state, payload) {
    state.login.error = payload.message
  },
  loginShowSection(state, payload) {
    state.login.shown_section = payload
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  updateUser({ commit }, user) {
    api.updateUser(user)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  autoSignIn({ commit }, payload) {
    commit('setUser', payload)
  },
  loginAnonymously({ commit }) {
    return auth.signInAnonymously().catch(function(error) {
      commit('loginError', error)
    })
  },
  signInWithGoogle({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },
  signInWithEmail({ commit }, params) {
    return auth
      .signInWithEmailAndPassword(params.email, params.password)
      .catch(err => {
        commit('loginError', err)
      })
  },
  createUserWithEmailAndPassword({ commit }, params) {
    auth
      .createUserWithEmailAndPassword(params.email, params.password)
      .catch(function(error) {
        //debugger
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // ...
      })
  },

  signOut({ commit, redirect }) {
    auth
      .signOut()
      .then(() => {
        commit('setUser', null)
      })
      .catch(err => console.log(err))
  }
}

export const getters = {
  activeUser: (state, getters) => {
    return state.user
  }
}
