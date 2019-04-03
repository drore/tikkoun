import { auth } from '@/plugins/firebase.js'

export default context => {
  const { store, redirect } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch('auth/setUser', user)
        store.dispatch('auth/updateUser', user)
        return resolve()
      }
      return resolve()
    })
  })
}
