import Vuex from 'vuex'
import { auth, GoogleProvider } from '@/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      manuscript: {
        attribution: '',
        page: {
          img_src: '',
          line: {
            polygon: {
              top_left: { x: 0, y: 0 },
              top_right: { x: 0, y: 0 },
              bottom_left: { x: 0, y: 0 },
              bottom_right: { x: 0, y: 0 }
            }
          }
        }
      }
    }),
    mutations: {
      setUser(state, payload) {
        state.user = payload
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {},
      autoSignIn({ commit }, payload) {
        commit('setUser', payload)
      },

      signInWithGoogle({ commit }) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut({ commit }) {
        auth
          .signOut()
          .then(() => {
            commit('setUser', null)
          })
          .catch(err => console.log(err))
      }
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    }
  })
}

export default createStore
