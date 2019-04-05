import { auth } from '@/plugins/firebase.js'

export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const _user = user.toJSON()
        store.dispatch('auth/setUser', _user)
        store.dispatch('auth/updateUser', _user)
        return resolve()
      }
      return resolve()
    })
  })
}
