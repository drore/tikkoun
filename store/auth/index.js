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
  setUserRole(state, payload) {
    state.user.role = payload
  },
  loginError(state, payload) {
    state.login.error = payload.message
  },
  loginShowSection(state, payload) {
    state.login.shown_section = payload
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
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  updateUser({ commit }, user) {
    api.updateUser(user)
  },
  sendResetPasswordMail({ commit }, emailAddress) {
    return api.sendResetPasswordMail(emailAddress)
  },
  loginShowSection({ commit }, section) {
    commit('loginShowSection', section)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
    // api.getUser(user.uid).then(res => {
    //   const userData = res.data()
    //   commit('setUserRole', userData.role)
    // })
  },
  gotUserLines({ commit }, payload) {
    commit('gotUserLines', payload)
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
    return auth
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
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          commit('setUser', null)
          resolve()
        })
        .catch(err => console.log(err))
    })
  }
}

export const getters = {
  activeUser: (state, getters) => {
    return state.user
  }
}
