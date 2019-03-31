import { auth } from '@/plugins/firebase.js'

export default context => {
  const { store, redirect } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        store.commit('setUser', user)
        store.dispatch('INIT', user.default_manuscript)
        return resolve()
      }
      redirect('/')
      return resolve()
    })
  })
}
